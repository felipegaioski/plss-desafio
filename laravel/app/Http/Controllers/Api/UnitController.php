<?php

namespace App\Http\Controllers\Api;

use App\Models\Unit;
use Illuminate\Http\Request;
use App\Traits\ApiQueryBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\Units\StoreUnitRequest;
use App\Http\Requests\Units\UpdateUnitRequest;

class UnitController extends Controller
{
    use ApiQueryBuilder;

    public function get(Request $request)
    {
        $query = Unit::query();
        $query = $this->applyIncludes($query, $request);
        $query = $this->applyCustomFilters($query, $request);
        $units = $query->orderBy('unit_category_id', 'desc')->get();

        return response()->json([
            'error' => false,
            'units' => $units,
        ], 200);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            DB::beginTransaction();


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request)
    {
        try {
            DB::beginTransaction();


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        try {
            DB::beginTransaction();


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        try {
            DB::beginTransaction();


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 200);
    }
}
