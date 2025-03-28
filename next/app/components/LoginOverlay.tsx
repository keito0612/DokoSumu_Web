"use client";

import { AuthService } from "@/service/authServise";
import { useRouter } from "next/navigation";



type LoginOverlayProps = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export default function LoginOverlay({
  title = "投稿にはログインが必要です",
  description = "ログインしてから、投稿をして下さい。",
  buttonText = "ログインする",
}: LoginOverlayProps) {
  const session = AuthService.getSesstion();
  const route = useRouter();
  const onClick = (() => {
    route.push('/login');
  });

  if (session) return null; // ローディング中 or ログイン済みなら表示しない

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 text-center w-80">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300 text-sm">{description}</p>
        <button
          onClick={onClick}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:opacity-80 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
