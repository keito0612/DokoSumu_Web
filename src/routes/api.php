<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ReviewController;
use Symfony\Component\HttpKernel\Profiler\Profile;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/{prefectures_id}/citys/', [CityController::class, 'getCitys']);
Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/post/city_review/${prefecture_id}/${city_id}',[ReviewController::class,'postCityReview']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::post('/register', [AuthController::class, 'register']);

Route::prefix('profile')->group(function () {
    Route::get('/index', [Profile::class, 'index']);
    Route::get('/update', [Profile::class, 'update']);
});
