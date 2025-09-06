<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use App\Servises\EmailServise;
use Illuminate\Container\Attributes\Log as AttributesLog;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

use function Psy\debug;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();

        try {
        // ユーザー作成
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);

            // トークン発行
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;

            DB::commit();

            return response()->json([
                'message' => 'ユーザー登録が完了しました。',
                'token' => $token,
            ], Response::HTTP_CREATED);

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('ユーザー登録エラー: ' . $e->getMessage());
            return response()->json([
                'message' => '内部サーバーエラー'
            ]    , Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function login(Request $request)
    {
        try {
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

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => '無効なメールアドレスまたはパスワードです。'], Response::HTTP_UNAUTHORIZED);
            }

            $user->tokens()->delete();
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;
            return response()->json(['token' => $token], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => '内部サーバーエラー'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout(Request $request)
    {

        try {
            $request->user()->tokens->each(function ($token) {
                $token->delete();
            });
            Log::debug('Logout token: ', ['token' => $request->user()->currentAccessToken()]);
            return response()->json(['message' => 'ログアウトしました。'], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => '内部サーバーエラー'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function checkEmail($email)
    {
        return DB::table('users')->where('email', $email)->exists();
    }

    public function sendPasswordResetEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ], [
            'email.required' => 'メールアドレスは必須です。',
            'email.email'    => '有効なメールアドレスを入力してください。',
            'email.exists'   => 'このメールアドレスは登録されていません。',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $user = User::where('email', $request->email)->first();
            $token = Str::random(60);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $user->email],
                [
                    'token' => Hash::make($token),
                    'created_at' => now(),
                ]
            );

            $resetUrl = config('app.frontend_url') . "/reset-password?token=$token&email={$user->email}";

            Mail::to($user->email)->send(new ResetPasswordMail($resetUrl));

            return response()->json(['message' => 'パスワードリセットメールを送信しました'], Response::HTTP_OK);

        } catch (\Exception $e) {
            Log::error('パスワードリセットメール送信エラー: ' . $e->getMessage());
            return response()->json(['message' => 'サーバーに問題が発生しました。もう一度お試しください。'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate(
            [
                'email'    => 'required|email|exists:users,email',
                'token'    => 'required',
                'password' => 'required|string|min:8|confirmed',
            ],
            [
                'email.required'    => 'メールアドレスは必須です。',
                'email.email'       => '有効なメールアドレスを入力してください。',
                'email.exists'      => 'このメールアドレスは登録されていません。',
                'token.required'    => 'トークンが見つかりません。',
                'password.required' => '新しいパスワードを入力してください。',
                'password.string'   => 'パスワードは文字列で入力してください。',
                'password.min'      => 'パスワードは8文字以上で入力してください。',
                'password.confirmed'=> 'パスワード確認が一致しません。',
            ]
        );

        try {
            $resetData = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->first();

            if (!$resetData) {
                return response()->json(['message' => '無効なトークンです'], Response::HTTP_UNAUTHORIZED);
            }

            // 有効期限チェック（1時間）
            if (now()->diffInMinutes($resetData->created_at) > 60) {
                DB::table('password_reset_tokens')->where('email', $request->email)->delete();
                return response()->json(['message' => 'トークンの有効期限が切れています'], Response::HTTP_UNAUTHORIZED);
            }

            // トークンチェック
            if (!Hash::check($request->token, $resetData->token)) {
                return response()->json(['message' => '無効なトークンです'], Response::HTTP_UNAUTHORIZED);
            }

            // パスワード更新
            $user = User::where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            // トークン削除
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            return response()->json(['message' => 'パスワードが更新されました'], Response::HTTP_OK);

        } catch (\Exception $e) {
            Log::error('パスワード更新エラー: ' . $e->getMessage());
            return response()->json(['message' => 'サーバ側で問題'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
