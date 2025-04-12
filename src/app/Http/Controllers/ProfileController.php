<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\ErrorHandler\Debug;

use function PHPUnit\Framework\isEmpty;

class ProfileController extends Controller
{
    function getProfile()
    {
        $user = Auth::user();
        $profile = User::where('id', $user->id)->get();
        if ($profile->isEmpty()) {
            return response()->json(['error' => 'user not found'], 404);
        }
        return response()->json([
            'profile' => $profile
        ], 200);
    }

    function update(ProfileRequest $request)
    {
        DB::beginTransaction();
        try{
            $user = Auth::user();
            $profile = User::where('id', $user->id)->get();
            if ($profile->isEmpty()) {
                return response()->json(['error' => 'user not found'], 404);
            }
            $image = $request->file("image");
            $path = Storage::disk("public")->putFile('profile', $image);
            $imagePath = "/storage/" . $path;
            $profile->name = $request->name;
            $profile->image_path = $imagePath;
            $profile->save();
            DB::commit();
            return response()->json(['success' => true], Response::HTTP_OK);
        }catch(Exception $e){
            Log::debug($e->getMessage());
            DB::rollback();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }
}
