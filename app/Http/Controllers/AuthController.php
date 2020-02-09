<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use Response;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register','userList']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $output['messege'] = 'Login Successfully';
        $output['msgType'] = 'success';
        $token = $this->guard()->attempt($credentials);
        $output['token'] = $token;

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($output);
        }

        return response()->json(['errors' => 'Unauthorifdfdfzed'], 401);
    }

    public function register(Request $request)
    {
       User::create([
         'name' => request('name'),
         'email' => request('email'),
         'password' => Hash::make(request('password'))
       ]);

        $output['messege'] = 'User Create Successfully';
        $output['msgType'] = 'success';

        echo json_encode($output);

      // return $this->login(request());
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    public function update(Request $request)
    {
         auth()->user()->update($request->all());
         $output['messege'] = 'User profile has been updated';
         $output['msgType'] = 'success';

         echo json_encode($output);
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }

    
    public function userList(Request $request)
    {
        $data['result'] = User::get();
    	return $data;
    }

}