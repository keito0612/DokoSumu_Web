
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
    <div className="mx-auto  bg-white space-y-4">
      <ReviewHeader user={review.user} />
      <ReviewMeta />
      <ReviewBody review={review} />
      <ReviewPhotos photos={review.photos} />
      <ReviewActions />
    </div>
  );
}