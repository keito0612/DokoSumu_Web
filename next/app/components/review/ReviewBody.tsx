import { Review } from "@/types";
import ReviewRating from "./ReviewRating";

interface ReviewBodyProps {
  review: Review;
};
export default function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <div className="text-sm text-gray-700 space-y-1">
      <ReviewRating rating={review.rating} />
      <div className="flex flex-row justify-start w-full pb-3" >
        <span className=" text-xs lg:text-sm font-bold">良いところ：</span>
        <p className="w-4/5">{review.good_comment}</p>
      </div>
      <div className="flex flex-row justify-start" >
        <span className="text-xs lg:text-sm font-bold">悪いところ：</span>
        <p className="w-4/5">{review.bad_comment}</p>
      </div>
    </div>
  );
}