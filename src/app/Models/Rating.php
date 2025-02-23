<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{

    protected $fillable = [
        'review_id',
        'livability',
        'city_policies',
        'rent_affordability',
        'safety',
        'public_transportation',
    ];
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
