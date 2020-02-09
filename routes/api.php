<?php

use Illuminate\Http\Request;

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

   Route::get('userList','AuthController@userList');
   Route::delete('user/delete/{id}','Api\CategoryController@userDelete');
   Route::get('userSearch','Api\CategoryController@userSearch');


    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('update', 'AuthController@update');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
