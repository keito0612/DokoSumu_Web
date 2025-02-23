<?php

namespace App\Http\Controllers;

use App\Http\Requests\CityRequest;
use App\Models\Prefectures;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CityController extends Controller
{
    function getCitys($prefectures_id)
    {
        $prefecture = Prefectures::where('id', $prefectures_id)->first();
        if (!$prefecture) {
            return response()->json(['error' => 'Prefecture not found'], 404);
        }

        return response()->json([
            'prefecture' => $prefecture->name,
            'citys' => $prefecture->citys
        ], 200);
    }
}
