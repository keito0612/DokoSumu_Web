<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prefectures extends Model
{
    use HasFactory;

    public function citys()
    {
        return $this->hasMany(City::class);
    }
}
