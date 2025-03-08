"use client"

import Chart from "@/app/components/Chart";
import StarsRating from "@/app/components/StarsRating";
import { ChartData } from "@/types";

import { useState } from "react";


const categories = ["治安", "子育て", "制度", "交通機関", "住みやすさ"];

export default function RatingPost() {
  const [ratings, setRatings] = useState<{ [key: string]: number }>(
    Object.fromEntries(categories.map((cat) => [cat, 0]))
  );
  const [averageScore, setAverageScore] = useState<number>(0);

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => {
      const newRatings = { ...prev, [category]: value };
      const averageScore = Object.values(newRatings).reduce((sum, score) => sum + score, 0) / categories.length;
      setAverageScore(averageScore);
      return newRatings;
    });
  };

  const chartData: ChartData[] = categories.map((category) => (
    {
      name: category,
      score: ratings[category],
      fullMark: 0
    }));

  return (
    <div className="flex flex-col items-center p-4 mx-auto w-full max-w-4xl">
      {/* タイトル */}
      <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-6">あなたの評価を教えてください。</h2>

      {/* 星評価 */}
      <StarsRating rating={averageScore} />

      {/* レーダーチャート */}
      <Chart title="評価" data={chartData} className="mb-8 mt-8" />
      {/* セレクトボタン */}
      <div className="w-full flex flex-col justify-center">
        < div className="w-24 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
          それぞれの評価
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {categories.map((category) => (
            <div key={category} className="text-center">
              <p className="text-black text-base md:text-lg font-semibold mb-2">{category}</p>
              <select
                className="w-24 md:w-32 lg:w-36 bg-green-400 text-white rounded-md p-2"
                value={ratings[category]}
                onChange={(e) => handleRatingChange(category, Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value} className="bg-green-500 text-white">
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start w-full">
        <div className="w-20 h-20 md:w-24 md:h-12 flex items-center justify-center bg-green-500 text-white text-lg font-bold rounded-sm">
          良い所
        </div>
        <textarea
          className="w-full h-32 md:h-32 p-2 ml-4 border border-gray-300 rounded-lg resize-none"
          placeholder="良い点を入力してください"
        />
      </div>

      {/* 良いところ & 悪いところ */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 w-full">
        {/* 良いところ */}
        <div className="flex items-center w-full md:w-1/2">
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-green-500 text-white text-lg font-bold rounded-full">
            良い所
          </div>
          <textarea
            className="w-3/4 h-24 md:h-32 p-2 ml-4 border border-gray-300 rounded-lg resize-none"
            placeholder="良い点を入力してください"
          />
        </div>

        {/* 悪いところ */}
        <div className="flex items-center w-full md:w-1/2">
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-red-500 text-white text-lg font-bold rounded-full">
            悪い所
          </div>
          <textarea
            className="w-3/4 h-24 md:h-32 p-2 ml-4 border border-gray-300 rounded-lg resize-none"
            placeholder="悪い点を入力してください"
          />
        </div>
      </div>
    </div>
  );
}
