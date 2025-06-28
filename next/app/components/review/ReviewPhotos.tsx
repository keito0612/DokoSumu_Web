import { Photo } from "@/types";
import Image from "next/image";

interface ReviewPhotos {
  photos: Photo[];
}
export default function ReviewPhotos({ photos }: ReviewPhotos) {
  return (

    <div className="grid grid-cols-2 gap-4">
      {photos.map((photo, i) => (
        <div key={i} className="relative bg-black flex items-center justify-center aspect-square">
          {photo.photo_url && (
            <Image
              unoptimized
              src={photo.photo_url}
              alt="投稿写真"
              fill
              className="object-contain"
            />
          )}
        </div>
      ))}
    </div>
  );
}