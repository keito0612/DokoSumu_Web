<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Servises\EmailServise;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Psy\debug;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            Log::debug('Request Data:', $request->all());
            // バリデーション
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'max:255'],
                'email' => ['required', 'email', 'unique:users'],
                'password' => ['required', 'min:8', 'max:12']
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // メールアドレスがすでに登録されているかチェック
            if ($this->checkEmail($request->email)) {
                return response()->json(['message' => 'すでにアカウントが存在しています。'], Response::HTTP_CONFLICT);
            }

            // ユーザーを作成
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json(['message' => 'ユーザー登録が完了しました。'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => '内部サーバーエラー'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request)
    {
        // バリデーション
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // メールアドレスが存在しない場合
        if (!$this->checkEmail($request->email)) {
            return response()->json(['message' => 'アカウントが存在していません。'], Response::HTTP_NOT_FOUND);
        }

        // ユーザー認証
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::where('email', $request->email)->first();
            $user->tokens()->delete();
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;

            return response()->json(['token' => $token], Response::HTTP_OK);
        }

        return response()->json(['message' => '無効なメールアドレスまたはパスワードです。'], Response::HTTP_UNAUTHORIZED);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'ログアウトしました。'], Response::HTTP_OK);
    }

    private function checkEmail($email)
    {
        return DB::table('users')->where('email', $email)->exists();
    }
}
