'use client';

import { Photo } from '@/types';
import Image from 'next/image';

interface ReviewPhotoGalleryProps {
  photos: Photo[];
  onImageClick: (index: number | null) => void;
}

const ReviewPhotoGallery: React.FC<ReviewPhotoGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  const hasPhotos = photos.length > 0;
  const defaultImage = '/images/noImage.png';

  if (!hasPhotos) {
    // 写真が1枚もない場合：デフォルト画像を表示し、スクロールなし
    return (
      <div className="p-4">
        <div className="flex justify-start">
          <Image
            src={defaultImage}
            alt="画像がありません"
            width={650}
            height={400}
            className="rounded-md cursor-pointer"
            onClick={() => onImageClick(null)}
          />
        </div>
      </div>
    );
  }

  // 写真がある場合
  const mainPhoto = photos[0];
  const subPhotos = photos.slice(1, 5);

  return (
    <div className="py-2 flex flex-row gap-1">
      <div className="w-1/2 relative aspect-square">
        {/* メイン画像 */}
        <Image
          unoptimized
          key={0}
          src={mainPhoto.photo_url!}
          alt="メイン画像"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-xl object-cover cursor-pointer"
          onClick={() => onImageClick(0)}
        />
        {photos.length > 5 && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
            {photos.length} 枚以上の写真
          </div>
        )}
      </div>
      {/* サブ画像 */}
      <div className="w-3/5 grid items-center justify-center gap-1 grid-cols-2">
        {subPhotos.map((photo, idx) => (
          <div key={idx} className="relative aspect-square rounded-full">
            <Image
              unoptimized
              key={idx + 1}
              src={photo.photo_url!}
              alt={`サブ画像 ${idx + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-xl cursor-pointer"
              onClick={() => onImageClick(idx + 1)}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ReviewPhotoGallery;
