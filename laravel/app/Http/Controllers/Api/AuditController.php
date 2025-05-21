<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Traits\ApiQueryBuilder;
use App\Services\AuditFormatter;
use OwenIt\Auditing\Models\Audit;
use App\Http\Controllers\Controller;

class AuditController extends Controller
{
    use ApiQueryBuilder;

    protected function getCustomFilters()
    {
        return [
            'user_id' => function ($query, $key, $input) {
                return $query->where('user_id', $input);
            },
            'auditable_type' => function ($query, $key, $input) {
                return $query->where('auditable_type', 'App\Models\\' . $input);
            }
        ];
    }
    
    public function index(Request $request)
    {
        $audits = Audit::with('user')->latest()->paginate(10);

        $audits->getCollection()->transform(function ($audit) {
            return AuditFormatter::toTextArray($audit);
        });

        return response()->json($audits);
    }
}