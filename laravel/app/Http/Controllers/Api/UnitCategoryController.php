<?php

namespace App\Http\Controllers\Api;

use App\Models\UnitCategory;
use Illuminate\Http\Request;
use App\Traits\ApiQueryBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\UnitCategories\StoreUnitCategoryRequest;
use App\Http\Requests\UnitCategories\UpdateUnitCategoryRequest;

class UnitCategoryController extends Controller
{
    use ApiQueryBuilder;

    public function get(Request $request)
    {
        $query = UnitCategory::query();
        $query = $this->applyIncludes($query, $request);
        $query = $this->applyCustomFilters($query, $request);
        $unit_categories = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'error' => false,
            'unit_categories' => $unit_categories,
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
    public function store(StoreUnitCategoryRequest $request)
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
    public function show(UnitCategory $unitCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitCategoryRequest $request, UnitCategory $unitCategory)
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
    public function destroy(UnitCategory $unitCategory)
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
