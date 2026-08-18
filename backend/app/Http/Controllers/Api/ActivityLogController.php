<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ActivityLog::with('user');

        if ($request->module) $query->where('module', $request->module);
        if ($request->action) $query->where('action', $request->action);
        if ($request->user_id) $query->where('user_id', $request->user_id);

        return response()->json($query->latest()->paginate($request->pageSize ?? 50));
    }

    public function stats()
    {
        $lastWeek = now()->subWeek();

        return response()->json([
            'total'       => ActivityLog::count(),
            'thisWeek'    => ActivityLog::where('created_at', '>=', $lastWeek)->count(),
            'byModule'    => ActivityLog::selectRaw('module, count(*) as count')->groupBy('module')->get(),
            'byAction'    => ActivityLog::selectRaw('action, count(*) as count')->groupBy('action')->get(),
            'byUser'      => ActivityLog::selectRaw('user_id, count(*) as count')->groupBy('user_id')->with('user')->get(),
        ]);
    }

    public function heatmap()
    {
        $data = ActivityLog::where('created_at', '>=', now()->subDays(365))
            ->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->get();

        return response()->json($data);
    }

    public function breakdown()
    {
        $today    = ActivityLog::whereDate('created_at', today())->count();
        $week     = ActivityLog::where('created_at', '>=', now()->startOfWeek())->count();
        $month    = ActivityLog::where('created_at', '>=', now()->startOfMonth())->count();
        $recent   = ActivityLog::latest()->take(10)->with('user')->get();

        return response()->json([
            'today'   => $today,
            'week'    => $week,
            'month'   => $month,
            'recent'  => $recent,
        ]);
    }
}
