"use client";
import { Review } from "@/types";

interface ReviewLocationProps {
  review: Review;
}

export default function ReviewLocation({
  review
}: ReviewLocationProps) {

  return (
    <div className="flex items-center justify-start font-bold text-black">
      <p className="mr-2">{review.prefecture.name}</p>
      <p>{review.city.name}</p>
    </div>
  );
}
