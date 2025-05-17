<?php

namespace App\Models;

use App\Models\UnitCategory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = [
        'name',
        'abbreviation',
        'unit_category_id',
    ];

    public function unitCategory()
    {
        return $this->belongsTo(UnitCategory::class);
    }
}
