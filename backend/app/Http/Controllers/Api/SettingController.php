<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->keyBy('key')->map(fn($s) => $s->value);
        return response()->json($settings);
    }

    public function show($key)
    {
        $setting = Setting::where('key', $key)->first();

        if (!$setting) return response()->json(['error' => 'Setting not found'], 404);

        return response()->json($setting);
    }

    public function save(Request $request)
    {
        $data = $request->validate(['settings' => 'required|array']);

        foreach ($data['settings'] as $key => $value) {
            Setting::set($key, $value);
        }

        return response()->json(['message' => 'Settings saved']);
    }
}
