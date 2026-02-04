"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/service/authServise";
import Loading from "@/app/components/Loading";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Laravel Socialiteからのトークンを確認（クエリパラメータ）
        const token = searchParams.get("token");
        const errorParam = searchParams.get("error");

        if (errorParam) {
          setError(decodeURIComponent(errorParam));
          return;
        }

        if (token) {
          // Sanctumトークンを保存
          AuthService.setSesstion(token);

          // 新規登録か既存ログインかで遷移先を分ける
          const isNew = searchParams.get("is_new");
          if (isNew === "1") {
            router.push("/sinUp?google_auth=success");
          } else {
            router.push("/login?google_auth=success");
          }
          return;
        }

        // トークンがない場合はエラー
        setError("認証情報が取得できませんでした");
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("認証処理中にエラーが発生しました");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">認証エラー</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
          >
            ログインページに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Loading loadingtext="認証処理中..." />
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading loadingtext="読み込み中..." />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
