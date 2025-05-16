<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'E-mail ou senha incorretos'], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken; 

        return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);

            $token = $user->createToken('main')->plainTextToken;

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
