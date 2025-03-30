<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;

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
        return response()->json(['success' => true], Response::HTTP_OK);
    }
}
