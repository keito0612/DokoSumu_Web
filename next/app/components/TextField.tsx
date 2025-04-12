"use client";

import { FC, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  title?: string;
  className?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

const TextField: FC<TextFieldProps> = ({
  title = "",
  className = "",
  placeholder = "",
  register,
  errorMessage
}) => {
  const [charCount, setCharCount] = useState(0);
  const maxLength = 100;

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(event.target.value.length);
  };

  return (
    <div className={`flex flex-col justify-start ${className}`}>
      {title && (
        <div className="w-16 h-8 mb-2 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
          {title}
        </div>
      )}
      <input
        {...register}
        type="text"
        className="h-10 md:h-12 p-2 ml-4 border border-gray-300 text-black rounded-lg"
        placeholder={placeholder}
        onChange={handleTextChange}
      />
      <div className="pt-2 ml-4 flex justify-between items-start">
        {errorMessage ? (
          <span className="text-sm text-red-600">※{errorMessage}</span>
        ) : (
          <span className="invisible">空白</span>
        )}
        <span className="text-right text-gray-500 text-xs sm:text-sm md:text-base">
          {charCount}/{maxLength} 文字
        </span>
      </div>
    </div>
  );
};

export default TextField;
