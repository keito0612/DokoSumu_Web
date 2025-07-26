"use client";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

export default function ImageModal({
  isOpen,
  onClose,
  title,
  images,
}: ImageModalProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      {/* 背景 */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* モーダル */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="
        w-full
        max-w-[95vw]
        sm:max-w-6xl
        h-[90vh]
        sm:h-[700px]
        bg-white
        rounded-lg
        shadow-xl
        flex
        overflow-hidden
        flex-col sm:flex-row
      "
        >
          {/* 左側：画像一覧 */}
          <div className="w-[180px] overflow-y-auto border-r p-2 space-y-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-full h-24 object-cover cursor-pointer rounded border ${selectedImage === img
                  ? "border-blue-500"
                  : "border-transparent"
                  }`}
                alt={`thumb-${i}`}
              />
            ))}
          </div>

          {/* 右側：メイン画像とヘッダー */}
          <div className="flex-1 flex flex-col">
            {/* ヘッダー */}
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button onClick={onClose}>
                <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-black" />
              </button>
            </div>

            {/* タブ風カテゴリ */}
            <div className="flex gap-2 p-3 border-b text-sm text-gray-600">
              <button className="px-3 py-1 rounded-full bg-gray-200">すべて</button>
              <button className="px-3 py-1 rounded-full bg-gray-100">最新</button>
              <button className="px-3 py-1 rounded-full bg-gray-100">オーナー提供</button>
              <button className="px-3 py-1 rounded-full bg-gray-100">ストリートビューと360°</button>
            </div>

            {/* メイン画像 */}
            <div className="flex-1 p-4 flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage}
                alt="main"
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
