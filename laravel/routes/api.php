<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', 'App\Http\Controllers\Api\AuthController@logout');
    Route::apiResource('/users', 'App\Http\Controllers\Api\UserController');

    // Constructions
    // Route::apiResource('/constructions', 'App\Http\Controllers\Api\ConstructionController');
    Route::get('/constructions', 'App\Http\Controllers\Api\ConstructionController@get');
    Route::get('/constructions/{id}', 'App\Http\Controllers\Api\ConstructionController@find');

    // Measurements
    Route::apiResource('/measurements', 'App\Http\Controllers\Api\MeasurementController');
    Route::get('/measurements', 'App\Http\Controllers\Api\MeasurementController@get');
    Route::get('/measurements/find/{id}', 'App\Http\Controllers\Api\MeasurementController@find');

    // Units
    Route::get('/units', 'App\Http\Controllers\Api\UnitController@get');

    // Unit Categories
    Route::get('/unit-categories', 'App\Http\Controllers\Api\UnitCategoryController@get');
});

Route::post('/signup', 'App\Http\Controllers\Api\AuthController@signup');
Route::post('/login', 'App\Http\Controllers\Api\AuthController@login');