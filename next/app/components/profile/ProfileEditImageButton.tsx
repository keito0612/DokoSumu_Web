"use client";
import { UseFormRegisterReturn } from "react-hook-form";
import { SystemUiconsUserMale } from "../icons/SystemUiconsUserMale";
import Image from "next/image";

interface ProfileEditImageButtonProps {
  previewUrl: string | null;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileEditImageButton: React.FC<ProfileEditImageButtonProps> = ({ previewUrl, onChange, register, errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center space-x-3">
      <label htmlFor="profileImage" className="cursor-pointer">
        {(previewUrl == null ?
          <SystemUiconsUserMale width={100} height={100} className="rounded-full border-2 text-green-500 border-green-500 p-1" /> :
          <Image unoptimized src={previewUrl} objectFit="cover" alt="プロフィール写真" width={100} height={100} className="w-[100px] h-[100px] rounded-full" />
        )}
      </label>
      <input
        id="profileImage"
        {...register}
        accept="image/*"
        type="file"
        onChange={onChange}
        className="hidden"
      />
      <div className="pt-2 ml-4 flex justify-start items-start">
        {errorMessage ? (
          <span className="text-sm text-red-600">※{errorMessage}</span>
        ) : (
          <span className="invisible">空白</span>
        )}
      </div>
    </div>
  )
};

export default ProfileEditImageButton;