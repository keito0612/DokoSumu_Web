import { Review } from "@/types";
import StarsRating from "../StarsRating";

interface ReviewMeta {
  review: Review;
}

export default function ReviewMeta({ review }: ReviewMeta) {
  return (
    <div className="flex items-end space-x-2">
      <StarsRating rating={review.rating.average_rating} size={20} isScore={false} />
      <div className="text-sm text-gray-500">{review.posted_at_human}</div>
    </div>
  );
}