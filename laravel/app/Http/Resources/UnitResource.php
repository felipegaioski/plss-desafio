<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UnitCategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
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
            'category' => new UnitCategoryResource($this->category),
        ];
    }
}