<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Photo extends Model
{
    use HasFactory;
    protected $fillable = [
        'review_id',
        'image_path',
    ];

    function review()
    {
        return $this->belongsTo(Review::class);
    }
}
