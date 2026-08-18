<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'icon'        => 'nullable|string',
            'category'    => 'required|string',
            'proficiency' => 'required|integer|min:0|max:100',
            'color'       => 'nullable|string',
        ]);
        $data['order'] = Skill::max('order') + 1;

        return response()->json(Skill::create($data), 201);
    }

    public function show($id)
    {
        return Skill::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->all());
        return $skill;
    }

    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function reorder(Request $request)
    {
        foreach ($request->ids as $i => $id) {
            Skill::where('id', $id)->update(['order' => $i + 1]);
        }
        return response()->json(['success' => true]);
    }
}
