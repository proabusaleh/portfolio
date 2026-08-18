<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $user->id,
            'bio'      => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'website'  => 'nullable|url|max:255',
            'avatar'   => 'nullable|string|max:500',
        ]);

        $user->update($data);

        ActivityLog::log('updated_profile', 'Profile', $user->email);

        return response()->json([
            'user' => $user->only(['id', 'name', 'email', 'avatar', 'status', 'bio', 'location', 'website']),
            'role' => $user->getRoleNames()->first() ?? 'admin',
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        ActivityLog::log('changed_password', 'Profile', $user->email);

        return response()->json(['message' => 'Password updated successfully']);
    }
}
