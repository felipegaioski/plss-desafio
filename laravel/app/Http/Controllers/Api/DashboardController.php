<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Construction;
use App\Models\Measurement;
use App\Models\Audit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function get()
    {
        $data = [
            'total_users' => User::count(),
            'total_constructions' => Construction::count(),
            'total_measurements' => Measurement::count(),

            'recent_constructions' => Construction::latest()->take(5)->get(['id', 'name', 'created_at']),

            'measurement_stats' => [
                'today' => Measurement::whereDate('created_at', today())->count(),
                'this_week' => Measurement::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
                'this_month' => Measurement::whereMonth('created_at', now()->month)->count(),
            ],

        ];

        info($data);

        return response()->json($data);
    }
}
