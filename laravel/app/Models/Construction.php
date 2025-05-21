<?php

namespace App\Models;

use App\Models\Measurement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Construction extends Model implements Auditable
{
    use SoftDeletes;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'description',
        'address',
    ];

    protected $auditInclude = ['name', 'description', 'address'];
    protected $auditEvents = ['created', 'updated', 'deleted'];

    public function measurements()
    {
        return $this->hasMany(Measurement::class);
    }
  
    public function latest_measurement()
    {
        return $this->hasOne(Measurement::class)->latestOfMany('measured_at');
    }

}
