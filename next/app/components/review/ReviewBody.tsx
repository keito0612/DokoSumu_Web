import { Review } from "@/types";
import ReviewRating from "./ReviewRating";
import ExpandableText from "../ExpandableText";

interface ReviewBodyProps {
  review: Review;
};
export default function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <div className="text-sm text-gray-700 space-y-1">
      <ReviewRating rating={review.rating} />
      <div className="flex flex-row justify-start w-full pb-3" >
        <span className=" text-xs lg:text-sm font-bold">良いところ：</span>
        <div className="flex-1">
          <ExpandableText text={review.good_comment} maxLength={200} />
        </div>
      </div>
      <div className="flex flex-row justify-start" >
        <span className="text-xs lg:text-sm font-bold">悪いところ：</span>
        <div className="flex-1">
          <ExpandableText text={review.bad_comment} maxLength={200} />
        </div>
      </div>
    </div>
  );
}