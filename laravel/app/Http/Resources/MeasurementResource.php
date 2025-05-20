<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UnitResource;
use App\Http\Resources\ConstructionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementResource extends JsonResource
{
    public static $wrap = 'measurement';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'observation' => $this->observation,
            'measured_at' => $this->measured_at->format('d-m-Y'),
            'unit' => new UnitResource($this->unit),
            'construction' => new ConstructionResource($this->construction),
        ];
    }
}
