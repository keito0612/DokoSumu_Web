<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\CityController;
use Symfony\Component\HttpKernel\Profiler\Profile;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/{prefectures_id}/citys/', [CityController::class, 'getCitys']);
Route::group(['middleware' => ['api']], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
Route::post('/register', [AuthController::class, 'register']);

Route::prefix('profile')->group(function () {
    Route::get('/index', [Profile::class, 'index']);
    Route::get('/update', [Profile::class, 'update']);
});
