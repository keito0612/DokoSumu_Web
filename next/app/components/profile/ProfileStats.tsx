"use client";
interface ProfileStatsProps {
  postCount: number;
  likeCount: number;
}
const ProfileStats: React.FC<ProfileStatsProps> = ({ postCount, likeCount }) => (
  <div className="flex flex-row justify-center lg:justify-start gap-8 py-4">
    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-6 py-3">
      <p className="text-gray-900 text-2xl font-bold">{postCount}</p>
      <p className="text-gray-500 text-sm font-medium">投稿</p>
    </div>
    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-6 py-3">
      <p className="text-gray-900 text-2xl font-bold">{likeCount}</p>
      <p className="text-gray-500 text-sm font-medium">いいね</p>
    </div>
  </div>
);

export default ProfileStats;