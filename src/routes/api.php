<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Models\Review;
use Symfony\Component\HttpKernel\Profiler\Profile;


Route::get( '/some_url', function () {
    return "Token is wrong";
}
)->name('login');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/{prefectures_id}/citys/', [CityController::class, 'getCitys']);
Route::get('/prefecture_reviews/{prefectures_id}',[ReviewController::class, 'getPrefectureReviews']);
Route::get('/city_reviews/{prefectures_id}/{city_id}',[ReviewController::class, 'getCityReviews']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/post/city_review/{prefecture_id}/{city_id}',[ReviewController::class,'postCityReview']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'getProfile']);
        Route::post('/update', [ProfileController::class, 'update']);
    });

});

