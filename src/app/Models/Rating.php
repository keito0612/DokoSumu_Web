<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'review_id',
        'livability',
        'city_policies',
        'child_rearing',
        'safety',
        'public_transportation',
        'average_rating'
    ];
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
