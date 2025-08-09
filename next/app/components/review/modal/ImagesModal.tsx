"use client";

import { Photo } from "@/types";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectImageIndex: number | null;
  title: string;
  images: Photo[];
}

export default function ImageModal({
  isOpen,
  onClose,
  title,
  selectImageIndex,
  images,
}: ImageModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(selectImageIndex ?? 0);
  const [imageLoading, setImageLoading] = useState(true);

  // 画像切り替え時にローディング状態をリセット
  useEffect(() => {
    setImageLoading(true);
    setSelectedImageIndex(selectImageIndex ?? 0);
  }, [selectImageIndex]);


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景 */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* モーダル */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="w-full max-w-[95vw] sm:max-w-7xl h-[95vh] sm:h-[900px] bg-white
          rounded-lg shadow-xl flex overflow-hidden flex-col sm:flex-row"
        >
          {/* 左側：画像一覧 */}
          <div className="w-[180px] overflow-y-auto border-r  p-2 space-y-2">
            {images.map((img, i) => (
              <Image
                key={i}
                width={180}
                height={180}
                unoptimized
                src={img.photo_url!}
                alt={`image-${i}`}
                style={{ objectFit: "cover" }}
                onClick={() => setSelectedImageIndex(i)}
                className={`object-cover cursor-pointer rounded border ${selectedImageIndex === i ? "border-lime-500 border-2" : "border-transparent"
                  }`}
              />
            ))}
          </div>

          {/* 右側 */}
          <div className="flex-1 flex flex-col">
            {/* ヘッダー */}
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-lg font-bold text-black">{title}</h2>
              <button onClick={onClose}>
                <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-black" />
              </button>
            </div>

            {/* メイン画像 */}
            <div className="flex-1 p-4 w-full flex  bg-black items-center justify-center overflow-hidden">
              {imageLoading && (
                <div className="animate-pulse bg-gray-700 w-full aspect-square " />
              )}
              {images[selectedImageIndex ?? 0] && (
                <div
                  className={`relative w-full h-auto aspect-square flex items-center justify-center  transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                >
                  <Image
                    unoptimized
                    src={images[selectedImageIndex ?? 0].photo_url!}
                    fill
                    style={{ objectFit: "contain" }}
                    alt="メイン画像"
                    // style={{ objectFit: "contain" }}
                    onLoad={() => setImageLoading(false)}
                    className="cursor-pointer rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

