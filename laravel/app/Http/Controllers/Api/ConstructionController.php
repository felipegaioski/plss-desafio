<?php

namespace App\Http\Controllers\Api;

use App\Models\Construction;
use Illuminate\Http\Request;
use App\Traits\ApiQueryBuilder;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\ConstructionResource;
use App\Http\Requests\Constructions\StoreConstructionRequest;
use App\Http\Requests\Constructions\UpdateConstructionRequest;

class ConstructionController extends Controller
{
    use ApiQueryBuilder;

    protected function getCustomFilters()
    {
        return [
            'id' => function ($query, $key, $input) {
                return $query->where('id', $input);
            },
            'name' => function ($query, $key, $input) {
                return $query->where('name', 'like', '%' . $input . '%');
            },
        ];
    }

    protected function getCustomSorts()
    {
        return [
            'latest_measurement' => function ($query, $direction) {
                $query->orderBy(
                    \DB::table('measurements')
                        ->select('measured_at')
                        ->whereColumn('measurements.construction_id', 'constructions.id')
                        ->latest('measured_at')
                        ->limit(1),
                    'desc'
                );
                return $query;
            },
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return ConstructionResource::collection(Construction::query()->orderBy('id', 'desc')->paginate(10));
    }

    public function get(Request $request)
    {
        $query = Construction::query();
        $query = $this->applyIncludes($query, $request);
        $query = $this->applyCustomFilters($query, $request);
        $query = $this->applySorting($query, $request);
        $constructions = $query->paginate(10);

        return response()->json([
            'error' => false,
            'constructions' => $constructions,
        ], 200);
    }

    public function find($id)
    {
        $construction = Construction::with('measurements.unit.unitCategory')->find($id);
        $measurements = $construction->measurements()->paginate(10);

        return response()->json([
            'error' => false,
            'construction' => $construction,
            'measurements' => $measurements,
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

        return response($construction, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Construction $construction)
    {
        try {
            DB::beginTransaction();

            $construction->measurements()->delete();
            $construction->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 204);
    }
}
