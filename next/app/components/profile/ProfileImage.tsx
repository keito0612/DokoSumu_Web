"use client";
import Image from "next/image";
import { SystemUiconsUserMale } from "../icons/SystemUiconsUserMale";

interface ProfileImageProps {
  imageUrl: string | null;
  sizes?: number; // 基準サイズ（px）
}

export function ProfileImage({ imageUrl, sizes = 100 }: ProfileImageProps) {
  // 最小 40px、最大 sizes px、中央は 10vw（適度に伸縮）
  const responsiveSize = `clamp(${sizes - 10}px, 10vw, ${sizes}px)`;

  const isValidSrc = typeof imageUrl === "string" && imageUrl.trim() !== "";

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: responsiveSize, height: responsiveSize }}
    >
      {isValidSrc ? (
        <Image
          unoptimized
          src={imageUrl}
          alt="プロフィール写真"
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <SystemUiconsUserMale
          width="100%"
          height="100%"
          className="rounded-full border-2 text-green-500 border-green-500 p-1"
        />
      )}
    </div>
  );
}

export default ProfileImage;

