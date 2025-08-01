<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    function getUser() {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ], 201);
    }
}
