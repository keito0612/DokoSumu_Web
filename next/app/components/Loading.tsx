import React, { FC } from "react";


interface LoadingProps {
  loadingtext: string;
}

const Loading: FC<LoadingProps> = ({ loadingtext }) => {
  return (
    <div className="flex flex-col items-center justify-center my-20 animate-fade-in">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full border-[3px] border-green-100"
        />
        <div
          className="absolute top-0 left-0 w-12 h-12 rounded-full border-[3px] border-transparent border-t-green-500 animate-spin"
        />
      </div>
      <p className="font-medium text-gray-600 pt-4">{loadingtext}</p>
    </div>
  );
};

export default Loading;