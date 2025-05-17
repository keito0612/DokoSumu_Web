import { Review } from "@/types";
import ReviewRating from "./ReviewRating";

interface ReviewBodyProps {
  review: Review;
};
export default function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <div className="text-sm text-gray-700 space-y-1">
      <ReviewRating rating={review.rating} />
      <div className="flex flex-row justify-start" >
        <span>良いところ：</span>
        <p>{review.good_comment}</p>
      </div>
      <div className="flex flex-row justify-start" >
        <span>悪いところ：</span>
        <p>{review.bad_comment}</p>
      </div>
    </div>
  );
}