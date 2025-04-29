import React, { FC } from "react";


interface LoadingProps {
  loadingtext: string;
}

const Loading: FC<LoadingProps> = (setStateProp) => {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div
        className="w-10 h-10 rounded-full border-4 border-green-400 animate-spin"
        style={{ borderTopColor: 'transparent' }}
      />
      <p className="font-bold pt-4">{setStateProp.loadingtext}</p>
    </div>
  );
};

export default Loading;