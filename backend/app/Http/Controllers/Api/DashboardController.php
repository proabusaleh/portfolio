<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\BlogPost;
use App\Models\Message;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function overview()
    {
        $lastMonth = now()->subMonth();

        $stats = [
            'projects' => [
                'current'  => Project::count(),
                'previous' => Project::where('created_at', '<', $lastMonth)->count(),
            ],
            'blog' => [
                'current'  => BlogPost::count(),
                'previous' => BlogPost::where('created_at', '<', $lastMonth)->count(),
            ],
            'messages' => [
                'current'  => Message::count(),
                'previous' => Message::where('created_at', '<', $lastMonth)->count(),
            ],
            'visitors' => [
                'current'  => 12459,
                'previous' => 10230,
            ],
        ];

        foreach ($stats as $key => $stat) {
            $prev                     = $stat['previous'] ?: 1;
            $stats[$key]['change']    = round((($stat['current'] - $stat['previous']) / $prev) * 100, 1);
            $stats[$key]['trend']     = $stats[$key]['change'] >= 0 ? 'up' : 'down';
        }

        return response()->json([
            'stats'          => $stats,
            'recentMessages' => Message::latest()->take(5)->get(),
            'recentProjects' => Project::latest()->take(4)->get(['id', 'title', 'image', 'category', 'status', 'views', 'created_at']),
        ]);
    }
}
