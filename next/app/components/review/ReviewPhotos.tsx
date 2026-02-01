"use client";

import { Photo } from "@/types";
import { useState } from "react";
import ImageModal from "./modal/ImagesModal";
import CustomImage from "../CustomImage";

interface ReviewPhotos {
  photos: Photo[];
}
export default function ReviewPhotos({ photos }: ReviewPhotos) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handlePhotoClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative bg-black flex items-center justify-center aspect-square cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden"
            onClick={() => handlePhotoClick(i)}
          >
            {photo.photo_url && (
              <CustomImage
                src={photo.photo_url}
                alt="投稿写真"
                fill
                objectFit="contain"
                className="pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectImageIndex={selectedIndex}
        title="写真"
        images={photos}
      />
    </>
  );
}