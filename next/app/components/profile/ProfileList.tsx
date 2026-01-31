"use client";
import { MenuAction, Review } from "@/types";
import { ReactNode, useState } from "react";
import ReviewList from "../review/ReviewList";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    className={`py-2.5 px-5 text-sm font-semibold rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-green-500 text-white shadow-sm'
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface ProfileListProps {
  postReviews: Review[];
  likedReviews: Review[];
  onMenuAction?: (action: MenuAction, id: number) => void | Promise<void>;
}

const ProfileList: React.FC<ProfileListProps> = (props) => {
  const [activeTab, setActiveTab] = useState('posts');
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6">
      <div className="flex gap-3 mb-4">
        <TabButton isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
          投稿
        </TabButton>
        <TabButton isActive={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
          いいね
        </TabButton>
      </div>
      <div className="overflow-y-auto max-h-[500px] rounded-xl">
        <ReviewList reviewList={activeTab === 'posts' ? props.postReviews : props.likedReviews} onMenuAction={props.onMenuAction} />
      </div>
    </div>
  )
}


export default ProfileList;