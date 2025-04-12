import { FC } from "react";
import Image from 'next/image';
import { User } from "@/types";
import { useRouter } from "next/router";
import ImageViwerHeader from "./ImageViewerHeader";

interface ImageViewerProps {
  user: User;
  imageSrc: string;
  onClose: () => void;
}

const ImageViewer: FC<ImageViewerProps> = ({ user, imageSrc }) => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  }
  return (
    <div className="fixed left-0 top-16 h-full  w-full sm:w-1/2 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
      <ImageViwerHeader user={user} onClose={onClose}
      />
      <Image className="px-4 w-full h-full" src={imageSrc} alt="Preview" width={500} height={500} />
    </div>
  );
};

export default ImageViewer;


