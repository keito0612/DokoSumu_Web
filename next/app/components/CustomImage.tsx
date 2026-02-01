"use client";

import { useState } from "react";
import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  objectFit?: "cover" | "contain";
  className?: string;
  onClick?: () => void;
  priority?: boolean;
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  fill = false,
  objectFit = "cover",
  className = "",
  onClick,
  priority = false,
}: CustomImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""}`}>
      {/* スケルトン or スピナー */}
      {loading && !error && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 z-10">
          <div className="h-8 w-8 animate-spin border-[3px] border-green-400 rounded-full border-t-transparent"></div>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
          <span className="text-gray-500 text-sm">画像を読み込めません</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          style={{ objectFit }}
          onClick={onClick}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          unoptimized={true}
          className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        />
      )}
    </div>
  );
}
