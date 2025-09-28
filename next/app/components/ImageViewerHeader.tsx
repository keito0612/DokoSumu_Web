import { FC } from "react";
import Image from 'next/image';
import { User } from "@/types";
import { SystemUiconsUserMale } from "./icons/SystemUiconsUserMale";

interface ImageViwerHeaderProps {
  user: User;
  onClose: () => void;
}

const ImageViwerHeader: FC<ImageViwerHeaderProps> = ({ user, onClose }) => {
  return (
    <div className="fixed left-0 top-16 h-28 top-4 w-full sm:w-1/2 bg-black bg-opacity-90 flex flex-row items-start justify-start">
      {user.image_path !== null ?
        <Image className="size-12" src={user.image_path!} alt="Preview" width={500} height={500} /> :
        <SystemUiconsUserMale className="text-white font-bold size-24" />
      }
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl p-2 rounded-full"
      >
        戻る
      </button>
    </div>

  );
};

export default ImageViwerHeader;

