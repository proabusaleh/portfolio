<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")
                  ->orWhere('email', 'like', "%$s%");
            });
        }

        if ($request->status) $query->where('status', $request->status);

        return response()->json($query->latest()->paginate($request->pageSize ?? 20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'avatar'   => 'nullable|string',
            'status'   => 'required|in:active,inactive,suspended',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        if ($request->role) {
            $user->assignRole($request->role);
        }

        return response()->json($user, 201);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->only(['name', 'email', 'avatar', 'status']);

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        if ($request->role) {
            $user->syncRoles([$request->role]);
        }

        return response()->json($user);
    }

    public function destroy($id)
    {
        if (auth()->id() === $id) {
            return response()->json(['error' => 'Cannot delete yourself'], 400);
        }

        User::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:active,inactive,suspended']);

        $user = User::findOrFail($id);
        $user->update(['status' => $request->status]);

        return response()->json($user);
    }
}
