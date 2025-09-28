"use client";
import { MenuAction, Review } from "@/types";
import ReviewListTile from "./ReviewListTile";

interface ReviewListProps {
  reviewList: Review[];
  onMenuAction?: (action: MenuAction, id: number) => void | Promise<void>;
  onUserClick?: (userId: number) => void;
}

export default function ReviewList({ reviewList, onMenuAction, onUserClick }: ReviewListProps) {
  return (
    <div className="py-4 w-full">
      {reviewList && reviewList.length > 0 ? (
        reviewList.map((review: Review, index: number) => (
          <div
            key={review.id}
            className={`p-4 ${index < reviewList.length - 1 ? 'border-b' : ''}`} // 最後の要素でなければborder-bを適用
          >
            <ReviewListTile review={review} onMenuAction={onMenuAction} onUserClick={onUserClick} /> {/* ReviewListTileにkeyは不要、親要素のdivに設定 */}
          </div>
        ))
      ) : (
        <div className="text-left text-gray-500 py-4 px-2">
          <p className="text-lg font-semibold">投稿がありません。</p>
        </div>
      )}
    </div>
  );
}