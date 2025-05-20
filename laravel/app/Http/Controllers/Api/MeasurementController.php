<?php

namespace App\Http\Controllers\Api;

use App\Models\Measurement;
use Illuminate\Http\Request;
use App\Traits\ApiQueryBuilder;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMeasurementRequest;
use App\Http\Requests\UpdateMeasurementRequest;

class MeasurementController extends Controller
{
    use ApiQueryBuilder;

    protected function getCustomFilters()
    {
        return [
            'construction_id' => function ($query, $key, $input) {
                return $query->where('construction_id', $input);
            },
        ];
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

    public function get(Request $request)
    {
        $query = Measurement::query();
        $query = $this->applyIncludes($query, $request);
        $query = $this->applyCustomFilters($query, $request);
        $measurements = $query->orderBy('id', 'desc')->paginate(10);

        return response()->json([
            'error' => false,
            'measurements' => $measurements,
        ], 200);
    }

    public function getByConstructionId($construction_id)
    {
        return response(Measurement::where('construction_id', $construction_id)->get(), 200);
    }

    public function find($id)
    {
        $measurement = Measurement::with('unit.unitCategory')->find($id);
        return response()->json([
            'error' => false,
            'measurement' => $measurement,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeasurementRequest $request)
    {
        info($request->toArray());
        try {
            DB::beginTransaction();

            $data = $request->validated();

            $measurement = Measurement::create($data);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response($measurement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Measurement $measurement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMeasurementRequest $request, Measurement $measurement)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();

            $measurement->update($data);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response($measurement, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Measurement $measurement)
    {
        try {
            DB::beginTransaction();

            $measurement->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response('', 200);
    }
}
