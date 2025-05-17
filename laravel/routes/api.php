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
});

Route::post('/signup', 'App\Http\Controllers\Api\AuthController@signup');
Route::post('/login', 'App\Http\Controllers\Api\AuthController@login');