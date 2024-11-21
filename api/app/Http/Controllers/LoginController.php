<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class LoginController extends Controller
{
    /**
     * Авторизация
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(LoginRequest $request): JsonResponse
    {
        dd('123');
        try {
            $credentials = [
                'samaccountname' => $request->login,
                'password' => $request->password,
            ];

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => __('auth.failed')], Response::HTTP_UNAUTHORIZED);
            }

            /** @var \App\Models\User|null $user */
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            // $userData = $this->userRepository->getUserWithPhoto($user->id);

            return response()->json([
                'user' => $userData,
                'message' => __('auth.success'),
                'token' => $token,
            ], Response::HTTP_OK);
        } catch (Throwable $e) {
            return response()->json([
                'message' => __('auth.error'),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
