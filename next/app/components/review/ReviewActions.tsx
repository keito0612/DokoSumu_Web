import { Review } from "@/types";
import ReviewLikeButton from "./ReviewLikeButton";

interface ReviewActionsProps {
  review: Review;
}


export default function ReviewActions(props: ReviewActionsProps) {
  return (
    <div className="flex items-center space-x-6 text-gray-600 text-sm">
      <ReviewLikeButton review={props.review} />
    </div>
  );
}