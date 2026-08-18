<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'icon'       => 'required',
            'title'      => 'required',
            'description'=> 'required',
            'features'   => 'array',
            'price_from' => 'numeric',
            'price_to'   => 'numeric',
            'color'      => 'nullable',
            'featured'   => 'boolean',
            'published'  => 'boolean',
        ]);
        $data['order'] = Service::max('order') + 1;
        return response()->json(Service::create($data), 201);
    }

    public function show($id)
    {
        return Service::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->all());
        return $service;
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function reorder(Request $request)
    {
        foreach ($request->ids as $i => $id) {
            Service::where('id', $id)->update(['order' => $i + 1]);
        }
        return response()->json(['success' => true]);
    }
}
