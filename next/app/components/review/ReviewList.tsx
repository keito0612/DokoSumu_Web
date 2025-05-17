import { Review } from "@/types";
import ReviewListTile from "./ReviewListTile";

interface ReviewListProps {
  reviewList: Review[];
}

export default function ReviewList({ reviewList }: ReviewListProps) {
  return (
    <>
      {
        reviewList.map((review: Review, i: number) => (
          <ReviewListTile key={i} review={review} />
        ))
      }
    </>
  )
}