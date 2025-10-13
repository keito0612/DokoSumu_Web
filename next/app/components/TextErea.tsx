"use client";

import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextEreaProps {
  title?: string;
  className?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

const TextErea: FC<TextEreaProps> = ({
  title = "",
  className = "",
  placeholder = "",
  register,
  errorMessage
}) => {
  return (
    <div className={`flex flex-col justify-start ${className}`}>
      {title && (
        < div className="w-16 h-8 mb-2 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
          {title}
        </div>
      )}
      <textarea

        {...register}
        className="h-40 sm:h-36 md:h-52 p-2 ml-4  border border-gray-300 text-black rounded-lg resize-none focus:outline-none focus:ring-green-500 focus:ring-2"
        placeholder={placeholder}
      />
      <div className="pt-2 ml-4 flex justify-start items-start">
        {errorMessage ? (
          <span className="text-sm text-red-600">※{errorMessage}</span>
        ) : (
          <span className="invisible">空白</span> // プレースホルダー
        )}
      </div>
    </div>
  );
};

export default TextErea;