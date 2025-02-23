<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Review extends Model
{

    protected $fillable = [
        'user_id',
        'prefecture_id',
        'citie_id',
        'good_comment',
        'bad_comment'
    ];
    public function likes()
    {
        return $this->hasMany(Like::class, 'review_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function rating()
    {
        return $this->belongsTo(Rating::class);
    }
    public function city()
    {
        return $this->hasOne(City::class);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class)->orderBy('id', 'asc');
    }
}
