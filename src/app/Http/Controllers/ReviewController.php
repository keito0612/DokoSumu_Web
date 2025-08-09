<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Http\Requests\CityRequest;
use App\Http\Requests\ReviewRequest;
use App\Models\Like;
use App\Models\Photo;
use App\Models\Rating;
use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\FileService;
use App\Notifications\InformationNotification;

class ReviewController extends Controller
{


    private FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    private function userId(){
        return optional(Auth::guard('api')->user())->id;
    }

    function getPrefectureReviews($prefectureId)
    {
        $reviews = Review::where('prefecture_id', $prefectureId)->with([
            'user',
            'city',
            'rating',
            'photos',
            'prefecture',
            'likes'
        ])->withCount('likes')->orderBy('created_at', 'desc')->get()->map(function ($review)  {
            $likes = $review->likes;
            if(!is_null($this->userId())){
                $review->is_liked = $likes->contains('user_id', $this->userId());
            }else{
                $review->is_liked = false;
            }
            return $review;
        });
        $photos = Photo::whereHas('review', function ($query) use ($prefectureId) {
                    $query->where("prefecture_id",$prefectureId);
        })->with('review.user')->get();
        return response()->json([
            "reviews" => $reviews,
            "photos" => $photos
        ], 200);
    }
    function getCityReviews($prefectureId, $cityId)
    {
        $reviews = Review::where([
            'prefecture_id' => $prefectureId,
            'city_id' => $cityId
        ])->with([
            'user',
            'city',
            'rating',
            'photos',
            'prefecture',
            'likes'
        ])->withCount('likes')->orderBy('created_at', 'desc')->get()->map(function ($review)  {
            $likes = $review->likes;
            if(!is_null($this->userId())){
                $review->is_liked = $likes->contains('user_id', $this->userId());
            }else{
                $review->is_liked = false;
            }
            return $review;
        });
        $photos = Photo::whereHas('review', function ($query) use ($prefectureId, $cityId) {
                    $query->where([
                        ["prefecture_id", '=', $prefectureId],
                        ["city_id","=", $cityId],
                    ]);
        })->with('review.user')->get();
        return response()->json([
            "reviews" => $reviews,
            "photos" => $photos
        ], 200);
    }

    function postCityReview($prefecture_id, $city_id, ReviewRequest $request)
    {
        DB::beginTransaction();
        $user_id = Auth::id();
        try {
            $newReview = Review::create(
                [
                    "user_id" => $user_id,
                    "prefecture_id" => $prefecture_id,
                    "city_id" => $city_id,
                    "good_comment" => $request->goodComment,
                    "bad_comment" => $request->badComment,
                ]
            );
            if ($newReview->isEmpty) {
                DB::rollback();
                return response()->json(["message" => "Review not found"], 404);
            }
            Rating::create([
                "livability" => $request->livability,
                "city_policies" => $request->cityPolicies,
                "child_rearing" => $request->childRearing,
                "safety" => $request->safety,
                "public_transportation" => $request->publicTransportation,
                "review_id" => $newReview->id,
                "average_rating" => $request->averageRating,
            ]);
            if ($request->hasFile('photos')) {
                $this->storePhotos($request->file('photos'), false,$newReview->id);
            }
            DB::commit();
            return response()->json([
                "message" => "created successfully"
            ], 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    function getReview($id)
    {
        $review = Review::with([
            'user',
            'city',
            'rating',
            'photos',
            'prefecture',
            'likes'
        ])->find($id);

        if (!$review) {
            return response()->json([
                "message" => "Review not found."
            ], 404);
        }

        return response()->json([
            "review" => $review
        ], 200);
    }

    function updateReview($id, ReviewRequest $request)
    {
        $review = Review::find($id);
        if(!$review){
            return response()->json([
                "message" => "Update review not found."
            ], 404);
        }
        DB::beginTransaction();
        try{
            $review->update([
                'good_comment' => $request->goodComment,
                'bad_comment' => $request->badComment
            ]);
            $rating = Rating::where('review_id', $review->id)->first();
            $rating->update([
                'livability' => $request->livability,
                'city_policies' => $request->cityPolicies,
                'safety' => $request->safety,
                'public_transportation' => $request->publicTransportation,
                'child_rearing' => $request->childRearing,
                "average_rating" => $request->averageRating,
            ]);
            if ($request->hasFile('photos')) {
                $this->storePhotos($request->file('photos'), true,$review->id);
            }
            DB::commit();
            return response()->json([
                "message" => "update review susessfully",
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    function deleteReview($id)
    {
        DB::beginTransaction();
        try{
            $review = Review::find($id);
            if (!$review) {
                return response()->json(["message" => "Review not found"], 404);
            }
            $review->delete();
            DB::commit();
            return response()->json([
                "message" => "delete review susessfully",
            ], 201);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    private function storePhotos($photos,$isEdit = false ,$reviewId)
    {
        $photoData = [];
        if ($isEdit) {
            $oldPhotos = Photo::where('review_id', $reviewId)->get();
            foreach ($oldPhotos as $oldPhoto) {
                $this->fileService->delete($oldPhoto->photo_url);
            }
            Photo::where('review_id', $reviewId)->delete();
        }
        foreach ($photos as $photo) {
            $extension = $photo->getClientOriginalExtension();
            // 英数字＋タイムスタンプのファイル名生成
            $fileName = time() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
            $directory = 'reviewImage';
            $path = $this->fileService->upload($photo, $directory,$fileName);
            $url  = $this->fileService->getUrl($path);
            $photoData[] = [
                "review_id" => $reviewId,
                "photo_url" => $url
            ];
        }
        Photo::insert($photoData);
    }

    function like($reviewId)
    {
        DB::beginTransaction();
        try{
            $userId = Auth::id();
            Like::create(
            [
                'user_id' => $userId,
                'review_id' => $reviewId
            ]
            );
            DB::commit();
            return response()->json([
                "message" => "You Liked the review",
            ], 201);
        }catch(Exception $e){
            DB::rollback();
            return response()->json([
                "message" => $e->getMessage(),
            ], 500);
        }
    }
    function unlike($reviewId)
    {
        try{
            $userId = Auth::id();
            $like = Like::where('review_id', $reviewId)->where('user_id', $userId)->first();
            $like->delete();

            return response()->json([
                "message" => "You UnLiked the review",
            ], 201);
        }catch(Exception $e){
            return response()->json([
                "message" => $e->getMessage(),
            ], 500);
        }
    }
}
