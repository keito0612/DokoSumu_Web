<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Nette\Schema\Expect;

class UserSettingController extends Controller
{
    function userId()
    {
        return Auth::id();
    }
    function index()
    {
        $userSetting = UserSetting::where('user_id',$this->userId())->first();
        return  response()->json([
            'user_setting' => $userSetting
        ] ,200);
    }

    function likeNotification(Request $request)
    {
        $request->validate([
            'like_notification' => 'required|boolean'
        ]);

        try {
            $userSetting = UserSetting::where('user_id', $this->userId())->firstOrFail();

            $userSetting->update([
                'like_notification' => $request->like_notification
            ]);

            return response()->json(['message' => '通知設定を更新しました'], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'ユーザー設定が見つかりません'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'サーバーエラーが発生しました'], 500);
        }
    }
}
