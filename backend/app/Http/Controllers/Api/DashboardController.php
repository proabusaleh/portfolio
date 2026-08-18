<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\BlogPost;
use App\Models\Message;
use App\Models\Subscriber;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function overview()
    {
        $lastMonth = now()->subMonth();

        /* ── Stats with comparison ── */
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
                'current'  => (int) Project::sum('views'),
                'previous' => (int) Project::where('created_at', '<', $lastMonth)->sum('views'),
            ],
        ];

        foreach ($stats as $key => $stat) {
            $prev                     = $stat['previous'] ?: 1;
            $stats[$key]['change']    = round((($stat['current'] - $stat['previous']) / $prev) * 100, 1);
            $stats[$key]['trend']     = $stats[$key]['change'] >= 0 ? 'up' : 'down';
        }

        /* ── Category breakdown (for bar chart) ── */
        $categoryColors = [
            'WordPress'   => '#3b82f6',
            'Flutter'     => '#06b6d4',
            'WooCommerce' => '#8b5cf6',
            'UI/UX'       => '#ec4899',
            'React'       => '#61dafb',
            'Laravel'     => '#ef4444',
            'Vue.js'      => '#42b883',
            'Node.js'     => '#68a063',
            'PHP'         => '#777bb4',
            'Mobile'      => '#f59e0b',
            'Other'       => '#94a3b8',
        ];

        $categoryData = Project::select('category', DB::raw('count(*) as count'))
            ->whereNotNull('category')
            ->groupBy('category')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($item) => [
                'name'  => $item->category,
                'count' => (int) $item->count,
                'color' => $categoryColors[$item->category] ?? '#94a3b8',
            ]);

        /* ── Blog activity by month (for line chart) ── */
        $blogActivity = BlogPost::select(
                DB::raw("DATE_FORMAT(published_at, '%Y-%m') as month"),
                DB::raw('count(*) as count'),
                DB::raw('coalesce(sum(views), 0) as views')
            )
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn ($item) => [
                'date'     => $item->month,
                'visitors' => (int) $item->views,
                'posts'    => (int) $item->count,
            ]);

        /* ── Traffic sources from project views ── */
        $totalViews = (int) Project::sum('views');
        $socialViews = (int) Project::where('category', 'UI/UX')->sum('views');
        $directViews = (int) Project::where('category', 'WordPress')->sum('views');
        $googleViews = (int) Project::where('category', 'Flutter')->sum('views');
        $referralViews = max(0, $totalViews - $socialViews - $directViews - $googleViews);

        $trafficData = collect([
            ['name' => 'Direct',   'value' => $directViews ?: 1,   'color' => '#6366f1'],
            ['name' => 'Google',   'value' => $googleViews ?: 1,   'color' => '#10b981'],
            ['name' => 'Social',   'value' => $socialViews ?: 1,   'color' => '#f59e0b'],
            ['name' => 'Referral', 'value' => $referralViews ?: 1, 'color' => '#ef4444'],
        ])->filter(fn ($item) => $item['value'] > 0)->values();

        return response()->json([
            'stats'          => $stats,
            'recentMessages' => Message::latest()->take(5)->get(),
            'recentProjects' => Project::latest()->take(4)->get(['id', 'title', 'image', 'category', 'status', 'views', 'created_at']),
            'categoryData'   => $categoryData,
            'blogActivity'   => $blogActivity,
            'trafficData'    => $trafficData,
            'counts' => [
                'services'    => Service::count(),
                'skills'      => Skill::count(),
                'testimonials'=> Testimonial::count(),
                'subscribers' => Subscriber::count(),
            ],
        ]);
    }
}
