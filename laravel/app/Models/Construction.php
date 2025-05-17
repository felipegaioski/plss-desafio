<?php

namespace App\Models;

use App\Models\Measurement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Construction extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
    ];

    public function measurements()
    {
        return $this->hasMany(Measurement::class);
    }

}
