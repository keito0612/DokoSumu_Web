"use client";

import { useState } from "react";
import { MdClose, MdArrowForward, MdArrowBack } from "react-icons/md";
import Image from "next/image";

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  isIcon?: boolean;
  fallbackEmoji?: string;
  fallbackBgColor?: string;
}

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TutorialStep[] = [
    {
      title: "プレリビへようこそ!",
      description: "日本全国の都道府県・市区町村のレビューを見たり、投稿したりできるサービスです。",
      image: "/images/prerevi_icon.png",
      isIcon: true,
    },
    {
      title: "都道府県を選択しよう",
      description: "気になる都道府県のボタンをタップして、詳細を見てみましょう。",
      image: "/images/tutorial/prefecture.png",
    },
    {
      title: "評価を確認",
      description: "選択すると詳細画面が開きます。総合評価やチャートで各項目の評価が確認できます。",
      image: "/images/tutorial/rating_review.png",
    },
    {
      title: "レビューを読む",
      description: "「レビュー」タブで実際のユーザーの声を読むことができます。",
      image: "/images/tutorial/review.png",
    },
    {
      title: "レビューを投稿",
      description: "市区町村を選んだ状態で「レビューする」ボタンから、あなたの経験を共有できます。",
      image: "/images/tutorial/review_post_button.png",
    },
    {
      title: "評価を入力",
      description: "各項目を星で評価し、良い点・悪い点のコメントを入力して投稿しましょう。",
      image: "/images/tutorial/review_post_screen.png",
    },
    {
      title: "準備完了!",
      description: "さっそく気になる都道府県を探してみましょう!",
      fallbackEmoji: "🎉",
      fallbackBgColor: "from-yellow-400 to-orange-500",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* チュートリアルカード - PC用に大きく */}
      <div className="relative z-10 w-full max-w-sm md:max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        {/* スキップボタン */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          aria-label="スキップ"
        >
          <MdClose size={20} />
        </button>

        {/* 画像またはフォールバック表示 */}
        {currentStepData.image ? (
          currentStepData.isIcon ? (
            // アイコン表示（全体表示 + アイコンと同じグラデーション背景）
            <div
              className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center"
              style={{ background: "linear-gradient(to bottom, #b5d582 0%, #428f57 100%)" }}
            >
              <Image
                src={currentStepData.image}
                alt={currentStepData.title}
                width={200}
                height={206}
                className="object-contain md:w-[280px] md:h-[288px] lg:w-[320px] lg:h-[330px]"
                priority
              />
            </div>
          ) : (
            // スクリーンショット表示
            <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100">
              <Image
                key={currentStepData.image}
                src={currentStepData.image}
                alt={currentStepData.title}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          )
        ) : (
          // 絵文字フォールバック
          <div className={`relative w-full h-48 md:h-64 lg:h-80 bg-gradient-to-br ${currentStepData.fallbackBgColor} flex items-center justify-center`}>
            <div className="text-7xl md:text-8xl lg:text-9xl">{currentStepData.fallbackEmoji}</div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full" />
          </div>
        )}

        {/* コンテンツ */}
        <div className="p-6 md:p-8">
          {/* プログレスバー */}
          <div className="h-1 md:h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* タイトル */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 text-center">
            {currentStepData.title}
          </h2>

          {/* 説明 */}
          <p className="text-gray-600 leading-relaxed mb-6 text-center text-sm md:text-base lg:text-lg">
            {currentStepData.description}
          </p>

          {/* ステップインジケーター */}
          <div className="flex justify-center gap-1.5 md:gap-2 mb-5">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentStep
                  ? "w-6 md:w-8 bg-green-500"
                  : index < currentStep
                    ? "w-1.5 md:w-2 bg-green-300"
                    : "w-1.5 md:w-2 bg-gray-200"
                  }`}
              />
            ))}
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex-1 py-3 md:py-4 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <MdArrowBack size={20} />
                戻る
              </button>
            )}
            <button
              onClick={handleNext}
              className={`${currentStep === 0 ? "w-full" : "flex-1"} py-3 md:py-4 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base`}
            >
              {currentStep === steps.length - 1 ? (
                "はじめる"
              ) : (
                <>
                  次へ
                  <MdArrowForward size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
