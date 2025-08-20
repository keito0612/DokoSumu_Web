import { Review } from "@/types";
import ReviewRating from "./ReviewRating";

interface ReviewBodyProps {
  review: Review;
};
export default function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <div className="text-sm text-gray-700 space-y-1">
      <ReviewRating rating={review.rating} />
      <div className="flex flex-row justify-start pb-3" >
        <span className="w-11/12 sm:w-2/4 lg:w-2/4 text-xs lg:text-sm font-bold">良いところ：</span>
        <p>{review.good_comment}</p>
      </div>
      <div className="flex flex-row justify-start" >
        <span className="w-11/12 sm:w-2/4 lg:w-2/4 text-xs lg:text-sm font-bold">悪いところ：</span>
        <p>{review.bad_comment}</p>
      </div>
    </div>
  );
}