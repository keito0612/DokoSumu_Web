"use client";

import { FC, useState } from "react";
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
  const [charCount, setCharCount] = useState(0);
  const maxLength = 300
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
  };
  return (
    <div className={`flex flex-col justify-start ${className}`}>
      {title && (
        < div className="w-16 h-8 mb-2 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
          {title}
        </div>
      )}
      <textarea

        {...register}
        className="h-40 sm:h-36 md:h-52 p-2 ml-4  border border-gray-300 text-black rounded-lg resize-none focus:outline-none focus:ring-lime-400 focus:ring-2"
        placeholder={placeholder}
        onChange={
          handleTextChange
        }
      />
      <div className="pt-2 ml-4 flex justify-between items-start">
        {errorMessage ? (
          <span className="text-sm text-red-600">※{errorMessage}</span>
        ) : (
          <span className="invisible">空白</span> // プレースホルダー
        )}
        <span className="text-right text-gray-500 text-xs sm:text-sm md:text-base">
          {charCount}/{maxLength} 文字
        </span>
      </div>
    </div>
  );
};

export default TextErea;