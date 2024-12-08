import React, { FC, ReactNode } from "react";
import ReactLoading from "react-loading";


interface LoadingProps {
  isLoading: boolean;
  loadingtext: string;
  children: ReactNode;
}

const Loading: FC<LoadingProps> = (setStateProp) => {
  if (setStateProp.isLoading) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div>
          <ReactLoading
            type="spin"
            color="#ebc634"
            height="100px"
            width="100px"
            className="mx-auto"
          />
          <p className="text-center mt-3">{setStateProp.loadingtext}</p>
        </div>
      </section>
    );
  } else {
    return <>{setStateProp.children}</>;
  }
};

export default Loading;