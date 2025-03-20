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

class ReviewController extends Controller
{

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
            "prefecture_reviews" => $reviews
        ], 200);
    }
    function getCityReviews($prefectureId, $cityId)
    {
        $reviews = Review::where([
            'prefecture_id' => $prefectureId,
            'citie_id' => $cityId
        ])->with([
            'user',
            'city',
            'rating',
            'photos',
            'prefecture',
            'likes'
        ])->get();
        return response()->json([
            "city_reviews" => $reviews
        ], 200);
    }

    function postCityReview($prefecture_id, $city_Id, ReviewRequest $request)
    {
        DB::beginTransaction();
        $user_id = Auth::id();
        try {
            $newReview = Review::create(
                [
                    "user_id" => $user_id,
                    "prefecture_id" => $prefecture_id,
                    "city_id" => $city_Id,
                    "good_comment" => $request->good_comment,
                    "bad_comment" => $request->bad_comment
                ]
            );
            if ($newReview->isEmpty) {
                return response()->json(["message" => "Review not found"], 404);
            }
            Rating::create([
                "livability" => $request->livability,
                "city_policies" => $request->city_policies,
                "child_rearing" => $request->child_rearing,
                "safety" => $request->safety,
                "public_transportation" => $request->public_transportation,
                "review_id" => $newReview->id
            ]);
            if ($request->hasFile('photos')) {
                $this->storePhotos($request->file('photos'), $newReview->id);
            }else{
                Photo::create([
                    "review_id" => $newReview->id,
                ]);
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
            return response()->json([
                "message" => "updated successfully"
            ], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    private function storePhotos($photos, $review_id)
    {
        foreach ($photos as $photo) {
            $fileName = time() . '_' . $photo->getClientOriginalName();
            $path = $photo->storeAs('public/photos', $fileName);

            Photo::create([
                "review_id" => $review_id,
                "image_path" => $path
            ]);
        }
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
