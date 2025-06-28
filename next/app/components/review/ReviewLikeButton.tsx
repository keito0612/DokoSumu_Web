import React, { useState } from 'react';
import { IconParkOutlineThumbsUp } from '../icons/IconParkOutlineThumbsUp';
import { Review } from '@/types';
import { UtilApi } from '@/Util/Util_api';
import { AuthService } from '@/service/authServise';

interface ReviewLikeButtonProps {
  review: Review;
}

const ReviewLikeButton: React.FC<ReviewLikeButtonProps> = ({ review }) => {
  const [isLiked, setIsLiked] = useState<boolean>(review.is_liked);
  const [likesCount, setLikesCount] = useState<number>(review.likes_count);

  async function handleLikeClick() {
    console.log(isLiked);
    let url: string = ''
    if (isLiked) {
      url = `${UtilApi.API_URL}/api/post/review/unlike/${review.id}`;
    } else {
      url = `${UtilApi.API_URL}/api/post/review/like/${review.id}`;
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AuthService.getSesstion()}`,
        },
      });
      if (res.ok) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      className="flex items-center gap-1 text-sm text-neutral-600"
    >
      <IconParkOutlineThumbsUp
        className={`w-5 h-5 ${isLiked ? 'text-green-500' : 'text-gray-400'}`}
      />
      <span>{likesCount}</span>
    </button>
  );
};

export default ReviewLikeButton;