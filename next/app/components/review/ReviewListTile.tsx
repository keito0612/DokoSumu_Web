import { Review } from "@/types";
import ReviewActions from "./ReviewActions";
import ReviewBody from "./ReviewBody";
import ReviewHeader from "./ReviewHeader";
import ReviewMeta from "./ReviewMeta";
import ReviewPhotos from "./ReviewPhotos";

interface ReviewListTileProps {
  review: Review;
}

export default function ReviewListTile({ review }: ReviewListTileProps) {
  return (
    <div className="max-w-2xl mx-auto border rounded-xl shadow p-4 bg-white space-y-4">
      <ReviewHeader user={review.user} />
      <ReviewMeta />
      <ReviewBody review={review} />
      <ReviewPhotos photos={review.photos} />
      <ReviewActions />
    </div>
  );
}