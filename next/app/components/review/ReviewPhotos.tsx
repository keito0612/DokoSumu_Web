import { Photo } from "@/types";


interface ReviewPhotos {
  photos: Photo[];
}
export default function ReviewPhotos({ photos }: ReviewPhotos) {
  return (

    <div className="grid grid-cols-2 gap-2">
      {photos.map((photo, i) => (
        <div key={i} className="relative">
          {(photo.photo_url &&
            // < Image src={photo.photo_url} alt="投稿をした写真" width={200} height={150} className="rounded object-cover w-full h-full brightness-75" />
            <img src={photo.photo_url} />
          )}
        </div>
      ))}
    </div>
  );
}