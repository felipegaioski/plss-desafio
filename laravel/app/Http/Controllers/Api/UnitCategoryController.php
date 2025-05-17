<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnitCategory;
use App\Http\Requests\StoreUnitCategoryRequest;
use App\Http\Requests\UpdateUnitCategoryRequest;

class UnitCategoryController extends Controller
{
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
