<?php

namespace App\Models;

use App\Models\Unit;
use App\Models\Construction;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    protected $fillable = [
        'amount',
        'construction_id',
        'unit_id',
        'observation',
        'measured_at',
    ];

    public $casts = [
        'measured_at' => 'datetime',
    ];

    public function construction()
    {
        return $this->belongsTo(Construction::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}
