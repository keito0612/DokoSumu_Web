"use client";
import { Review } from "@/types";
import { ReactNode, useState } from "react";
import ReviewList from "../review/ReviewList";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    className={`py-2 px-4 text-sm font-bold rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#39E079] text-white' : 'bg-[#F4F4F4] text-[#141414]'
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface ProfileListProps {
  postReviews: Review[];
  likedReviews: Review[];
}

const ProfileList: React.FC<ProfileListProps> = (props) => {
  const [activeTab, setActiveTab] = useState('posts');
  return (
    <div className="mt-6">
      <div className="flex gap-4 justify-start">
        <TabButton isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
          投稿リスト
        </TabButton>
        <TabButton isActive={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
          いいねリスト
        </TabButton>
      </div>
      <div className="mt-4 border border-gray-300 rounded-md p-1 overflow-y-auto max-h-[500px]">
        <ReviewList reviewList={activeTab === 'posts' ? props.postReviews : props.likedReviews} />
      </div>
    </div>
  )
}


export default ProfileList;