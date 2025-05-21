<?php

namespace App\Models;

use App\Models\UnitCategory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Unit extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

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
