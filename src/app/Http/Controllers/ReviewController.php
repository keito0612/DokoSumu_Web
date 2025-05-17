<?php

namespace App\Http\Controllers;

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
use Illuminate\Support\Facades\Log;
use App\Services\FileService;

class ReviewController extends Controller
{


    private FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
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
        ])->get();
        return response()->json([
            "reviews" => $reviews
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
        ])->get();
        return response()->json([
            "reviews" => $reviews
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
                    "bad_comment" => $request->badComment
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
                "review_id" => $newReview->id
            ]);
            if ($request->hasFile('photos')) {
                $this->storePhotos($request->file('photos'), $newReview->id);
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

    function updateReview($id, $prefecture_id, $city_Id, ReviewRequest $request)
    {
        $user_id = Auth::id();
        DB::beginTransaction();
        try {
            $updateReview = tap(Review::where("id", $id)->first())->update(
                [
                    "user_id" => $user_id,
                    "prefecture_id" => $prefecture_id,
                    "city_id" => $city_Id,
                    "good_comment" => $request->good_comment,
                    "bad_comment" => $request->bad_comment
                ]
            );
            if ($updateReview->isEmpty) {
                DB::rollback();
                return response()->json(["message" => "Review not found"], 404);
            }
            Rating::where("id", $id)->update([
                "livability" => $request->livability,
                "city_policies" => $request->city_policies,
                "child_rearing" => $request->child_rearing,
                "safety" => $request->safety,
                "public_transportation" => $request->public_transportation,
                "review_id" => $updateReview->id
            ]);
            if ($request->hasFile('photos')) {
                $this->storePhotos($request->file('photos'), $updateReview->id);
            }
            DB::commit();
            return response()->json([
                "message" => "updated successfully"
            ], 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    private function storePhotos($photos, $review_id)
    {
        $photoData = [];
        foreach ($photos as $photo) {
            $fileName = time() . '_' . $photo->getClientOriginalName();
            $directory = 'reviewImage';
            $path = $this->fileService->upload($photo, $directory,$fileName);
            $url  = $this->fileService->getUrl($path);
            $photoData[] = [
                "review_id" => $review_id,
                "photo_url" => $url
            ];
        }
        Photo::insert($photoData);
    }

    function like($reviewId)
    {
        $userId = Auth::id();
        Like::create(
            [
                'user_id' => $userId,
                'review_id' => $reviewId
            ]
        );
        return response()->json([
            "message" => "You Liked the review",
        ], 201);
    }
    function unlike($reviewId)
    {
        $userId = Auth::id();
        $like = Like::where('review_id', $reviewId)->where('user_id', $userId)->first();
        $like->delete();

        return response()->json([
            "message" => "You UnLiked the review",
        ], 201);
    }
}
