import { Photo } from "@/types";
import Image from "next/image";


interface ReviewPhotos {
  photos: Photo[];
}
export default function ReviewPhotos({ photos }: ReviewPhotos) {
  return (

    <div className="grid grid-cols-3 gap-2">
      {photos.map((photo, i) => (
        <div key={i} className="relative">
          {(photo.photo_url &&
            < Image src={photo.photo_url} alt="yakisoba" width={200} height={150} onError={(e) => console.log(e)} className="rounded object-cover w-full h-full brightness-75" />
          )}
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            +2
          </div>
        </div>
      ))}
    </div>
  );
}