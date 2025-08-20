"use client";

import { useEffect, useState } from "react";
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
}: CustomImageProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [])

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""}`}>
      {/* スケルトン or スピナー */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/10 z-10">
          <div className="h-8 w-8 animate-spin border-[3px] border-green-400 rounded-full border-t-transparent"></div>
        </div>
      )}

      <Image
        unoptimized
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        style={{ objectFit }}
        onClick={onClick}
        onLoadingComplete={() => setLoading(false)}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      />
    </div>
  );
}
