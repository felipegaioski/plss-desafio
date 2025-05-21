<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConstructionResource extends JsonResource
{

    public static $wrap = 'construction';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'measurements' => MeasurementResource::collection($this->measurements),
            'created_at' => $this->created_at->format('d-m-Y'),
        ];
    }
}
