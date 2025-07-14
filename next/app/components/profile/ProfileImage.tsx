"use client";
import Image from "next/image";
import { SystemUiconsUserMale } from "../icons/SystemUiconsUserMale";

interface ProfileImageProps {
  imageUrl: string | null;
}

export function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <div
      className="">
      {
        imageUrl == null ?
          <SystemUiconsUserMale width={80} height={80} className="rounded-full border-2 text-green-500 border-green-500 p-1" /> :
          <Image unoptimized src={imageUrl} objectFit="cover" alt="プロフィール写真" width={80} height={80} className="w-[80px] h-[80px] sm:h-[128px] sm:w-[128px] rounded-full" />
      }
    </div>
  );
};

export default ProfileImage;