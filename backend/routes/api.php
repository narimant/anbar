<?php

use App\Http\Controllers\Api\V1\PeopleCategoryController;
use App\Http\Controllers\Api\V1\PeopleController;
use App\Http\Controllers\Api\V1\ProductCategoryController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\StoreController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('people',PeopleController::class);
Route::get('search-people/{query}',[PeopleController::class,'search']);
Route::apiResource('people-category',PeopleCategoryController::class);
Route::get('search-people-category/{query}',[PeopleCategoryController::class,'search']);
Route::apiResource('product',ProductController::class);
Route::apiResource('product-category',ProductCategoryController::class);
Route::apiResource('store',StoreController::class);
