'use client';

import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface RatingSectionProps<T extends FieldValues> {
  categories: Path<T>[];
  categoriesTitle: string[];
  ratings: { [key: string]: number };
  errorMessage?: string;
  register: UseFormRegister<T>
  handleRatingChange: (category: string, value: number) => void;
}

const RatingSection = <T extends FieldValues>({
  categories,
  categoriesTitle,
  ratings,
  errorMessage,
  register,
  handleRatingChange,
}: RatingSectionProps<T>): React.ReactElement => {
  return (
    <div>
      <div className="w-24 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
        それぞれの評価
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {categories.map((category, index) => (
          <div key={category} className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700 mb-2">
              {categoriesTitle[index]}
            </label>
            <select
              {...register(category, {
                required: true,
              })}
              className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
              value={ratings[category]}
              onChange={(e) => handleRatingChange(category, Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {errorMessage ? (
        <span className="text-sm text-red-600">※{errorMessage}</span>
      ) : (
        <span className="invisible">空白</span>
      )}
    </div>
  );
};

export default RatingSection;