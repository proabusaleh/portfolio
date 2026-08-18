<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query();

        if ($request->featured !== null) $query->where('featured', $request->featured === 'true');
        if ($request->status)            $query->where('status', $request->status);
        if ($request->rating)            $query->where('rating', $request->rating);

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => 'required|string',
            'role'         => 'nullable|string',
            'company'      => 'nullable|string',
            'avatar'       => 'nullable|string',
            'rating'       => 'required|integer|min:1|max:5',
            'quote'        => 'required|string',
            'project_type' => 'nullable|string',
            'status'       => 'required|in:pending,approved,rejected',
            'featured'     => 'boolean',
            'email'        => 'nullable|email',
            'website'      => 'nullable|url',
            'date'         => 'nullable|date',
        ]);

        return response()->json(Testimonial::create($data), 201);
    }

    public function show($id)
    {
        return Testimonial::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->all());
        return $testimonial;
    }

    public function destroy($id)
    {
        Testimonial::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
