<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Factory;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateOptional
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * Bearerトークンが存在する場合のみ認証を試行し、
     * 成功時はAuth::user()でユーザーを取得可能にする。
     * トークンがない場合やエラー時はAuth::user()はnullを返す。
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string|null  $guard
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, $guard = null): Response
    {
        // Bearerトークンがある場合のみ認証を実行
        if ($request->bearerToken()) {
            try {
                // デフォルトでapiガードを使用（sanctumドライバー）
                $guardName = $guard ?: 'api';
                $authGuard = $this->auth->guard($guardName);

                // ユーザーを取得
                $user = $authGuard->user();

                if ($user) {
                    // 認証成功時にユーザーを設定
                    $authGuard->setUser($user);
                }
            } catch (AuthenticationException $e) {
                // 認証失敗時は何もしない
            } catch (\Exception $e) {
                // その他のエラーも握りつぶす
            }
        }

        return $next($request);
    }
}
