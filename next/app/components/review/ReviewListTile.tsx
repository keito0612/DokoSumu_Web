
import { MenuAction, Review } from "@/types";
import ReviewActions from "./ReviewActions";
import ReviewBody from "./ReviewBody";
import ReviewHeader from "./ReviewHeader";
import ReviewMeta from "./ReviewMeta";
import ReviewPhotos from "./ReviewPhotos";
import ReviewLocation from "./ReviewLocation";

interface ReviewListTileProps {
  review: Review;
  onMenuAction?: (action: MenuAction, id: number) => void | Promise<void>;
}

export default function ReviewListTile({ review, onMenuAction }: ReviewListTileProps) {
  return (
    <div className="mx-0  bg-white space-y-4">
      <ReviewHeader user={review.user} reviewId={review.id} onMenuAction={onMenuAction} />
      <ReviewLocation review={review} />
      <ReviewMeta review={review} />
      <ReviewBody review={review} />
      <ReviewPhotos photos={review.photos} />
      <ReviewActions review={review} />
    </div>
  );
}