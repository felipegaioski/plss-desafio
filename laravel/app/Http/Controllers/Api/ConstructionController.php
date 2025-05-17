<?php

namespace App\Http\Controllers\Api;

use App\Models\Construction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\ConstructionResource;
use App\Http\Requests\StoreConstructionRequest;
use App\Http\Requests\UpdateConstructionRequest;

class ConstructionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ConstructionResource::collection(Construction::query()->orderBy('id', 'desc')->paginate(10));
    }

    public function get()
    {
        $constructions = Construction::all();

        return response()->json([
            'error' => false,
            'constructions' => $constructions,
        ], 200);
    }

    public function find($id)
    {
        $construction = Construction::with('measurements.unit.unitCategory')->find($id);
        return response()->json([
            'error' => false,
            'construction' => $construction,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConstructionRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();

            $construction = Construction::create($data);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack(); 
        }
        
        return response(new ConstructionResource($construction), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Construction $construction)
    {
        $model = Construction::find($construction->id)->load('measurements.unit.unitCategory');
        return $model;
        // return new ConstructionResource($construction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConstructionRequest $request, Construction $construction)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();

            $construction->update($data);
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response(new ConstructionResource($construction), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Construction $construction)
    {
        try {
            DB::beginTransaction();

            $construction->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 204);
    }
}
