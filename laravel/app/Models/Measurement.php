<?php

namespace App\Models;

use App\Models\Unit;
use App\Models\Construction;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Measurement extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'amount',
        'construction_id',
        'unit_id',
        'observation',
        'measured_at',
    ];

    protected $auditEvents = ['created', 'updated, deleted'];

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
