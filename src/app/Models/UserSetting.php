<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'email_notification',
    ];

    public function user(){
        $this->belongsTo(User::class, 'user_id');
    }
}
