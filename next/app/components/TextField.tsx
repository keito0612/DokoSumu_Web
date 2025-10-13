"use client";

import { FC } from "react";
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

  return (
    <div className={`flex flex-col justify-start ${className}`}>
      {title && (
        <div className="w-16 h-8 mb-2 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
          {title}
        </div>
      )}
      <input
        {...register}
        type="text"
        className="h-10 md:h-12 p-2 ml-4 border border-gray-300 text-black rounded-lg"
        placeholder={placeholder}
      />
      <div className="pt-2 ml-4 flex justify-start items-start">
        {errorMessage ? (
          <span className="text-sm text-red-600">※{errorMessage}</span>
        ) : (
          <span className="invisible">空白</span>
        )}
      </div>
    </div>
  );
};

export default TextField;
