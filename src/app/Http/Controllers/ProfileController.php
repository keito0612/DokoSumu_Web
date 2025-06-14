<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\ErrorHandler\Debug;
use App\Services\FileService;
use function PHPUnit\Framework\isEmpty;

class ProfileController extends Controller
{

    private FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }
    function getProfile()
    {
        if (!(Auth::check())) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        $userId = Auth::id();
        $profile = User::with([
            'reviews.user',         // ユーザーが投稿したレビューとその投稿者情報
            'reviews.city',         // レビューの都市情報
            'reviews.prefecture',   // レビューの都道府県情報
            'reviews.rating',       // レビューの評価情報
            'reviews.photos',       // レビューの写真情報
            'reviews.likes',        // レビューのいいね情報
            'likedReviews.user'     // ユーザーがいいねしたレビューとその投稿者情報
        ])->where('id', $userId)->first();
        $profile?->append(['reviews_count', 'liked_reviews_count']);
        return response()->json([
            'profile' => $profile
        ], 200);
    }

    function update(ProfileRequest $request)
    {
        DB::beginTransaction();
        try{
            $userId = Auth::user()->id;;
            $profile = User::find( $userId);
            if (!$profile) {
                return response()->json(['error' => 'user not found'], 404);
            }
            if ($request->hasFile('profileImage')) {
                $image = $request->file("profileImage");
                $extension = $image->getClientOriginalExtension();
                // 英数字＋タイムスタンプのファイル名生成
                $fileName = time() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
                $directory = 'profileImage';
                $path = $this->fileService->upload($image, $directory,$fileName);
                $url  = $this->fileService->getUrl($path);
                $profile->image_path = $url;
            }
            $profile->name = $request->name;
            $profile->comment = $request->comment;
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
