"use client";
import { Review } from "@/types";
import ReviewListTile from "./ReviewListTile";

interface ReviewListProps {
  reviewList: Review[];
}

export default function ReviewList({ reviewList }: ReviewListProps) {
  return (
    <div className="py-4 w-full">
      {reviewList && reviewList.length > 0 ? (
        reviewList.map((review: Review, index: number) => (
          <div
            key={review.id} // review.id をキーとして使用することを推奨
            className={`p-4 ${index < reviewList.length - 1 ? 'border-b' : ''}`} // 最後の要素でなければborder-bを適用
          >
            <ReviewListTile review={review} /> {/* ReviewListTileにkeyは不要、親要素のdivに設定 */}
          </div>
        ))
      ) : (
        <div className="text-left text-gray-500 py-4 px-2"> {/* text-left と少しパディングを追加 */}
          <p className="text-lg font-semibold">投稿がありません。</p> {/* text-lg と font-semibold を追加 */}
        </div>
      )}
    </div>
  );
}