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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 animate-fade-in">
      <div className="bg-white shadow-modal rounded-2xl p-8 text-center w-80 animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{description}</p>
        <button
          onClick={onClick}
          className="mt-6 w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
