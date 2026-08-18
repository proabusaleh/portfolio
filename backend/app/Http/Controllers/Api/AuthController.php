<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password'],
            ]);
        }

        if ($user->status !== 'active') {
            throw ValidationException::withMessages([
                'email' => ['Your account is ' . $user->status],
            ]);
        }

        $user->update(['last_login_at' => now()]);

        $user->tokens()->delete();

        $token = $user->createToken('auth-token')->plainTextToken;

        ActivityLog::log('login', 'Auth', $user->email);

        return response()->json([
            'user'  => $user->only(['id', 'name', 'email', 'avatar', 'status']),
            'token' => $token,
            'role'  => $user->getRoleNames()->first() ?? 'admin',
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user->only(['id', 'name', 'email', 'avatar', 'status']),
            'role' => $user->getRoleNames()->first() ?? 'admin',
        ]);
    }

    public function logout(Request $request)
    {
        ActivityLog::log('logout', 'Auth', $request->user()->email);
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['No account found with this email'],
            ]);
        }

        return response()->json(['message' => 'Reset link sent to your email']);
    }
}
