import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";
import { SystemUiconsUserMale } from "@/app/components/icons/SystemUiconsUserMale";

interface ProfileImageUploaderProps {
  file: File | null;
  imageUrl: string | null;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  handleImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  file,
  imageUrl,
  register,
  errorMessage,
  handleImage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {file ? (
        <label htmlFor="profile_image">
          <Image
            src={imageUrl!}
            alt="プロフィール画像"
            width={128}
            height={128}
            className="rounded-full object-fill"
          />
        </label>
      ) : (
        <label
          htmlFor="profile_image"
          className="2xl:size-32 xl:size-32 lg:size-32 md:size-32 bg-gray-400 font-semibold rounded-full border-4 shadow-md cursor-pointer flex items-center justify-center transition duration-300"
        >
          <SystemUiconsUserMale className="text-white font-bold size-24" />
        </label>
      )}
      {errorMessage ? (
        <span className="text-sm text-red-600">※{errorMessage}</span>
      ) : (
        <span className="invisible">空白</span>
      )}
      <input
        id="profile_image"
        type="file"
        multiple
        className="hidden"
        {...register}
        onChange={handleImage}
      />
    </div>
  );
};

export default ProfileImageUploader;