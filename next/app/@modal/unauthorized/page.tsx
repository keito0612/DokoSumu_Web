"use client";

import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function UnauthorizedModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="text-black relative bg-white p-6 rounded-xl shadow-xl max-w-sm text-center">
        {/* 右上の閉じるボタン */}
        <button
          onClick={() => router.back()} // モーダルを閉じる
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          <Close style={{ fontSize: 30, color: 'black' }} className="h-6 w-6" />
        </button>

        <h2 className="text-lg font-bold mb-2">ログインが必要です</h2>
        <p className="mb-4 text-left">
          この機能を使用するには、ログインをお願いします。
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          ログインページへ
        </button>
      </div>
    </div>
  );
}

