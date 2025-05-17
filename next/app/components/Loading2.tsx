import React, { FC } from "react";

interface Loading2Props {
  loadingtext: string;
}

const Loading2: FC<Loading2Props> = ({ loadingtext }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex flex-col items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-4 border-green-400 animate-spin"
        style={{ borderTopColor: 'transparent' }}
      />
      <p className="font-bold pt-4">{loadingtext}</p>
    </div>
  );
};

export default Loading2;