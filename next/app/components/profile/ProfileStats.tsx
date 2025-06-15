"use client";
interface ProfileStatsProps {
  postCount: number;
  likeCount: number;
}
const ProfileStats: React.FC<ProfileStatsProps> = ({ postCount, likeCount }) => (
  <div className="flex flex-row gap-4 py-4 justify-start">
    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 border border-[#E0E0E0]">

      <p className="text-[#141414] tracking-light text-2xl font-bold leading-tight">{postCount}</p>
      <p className="text-neutral-500 text-base font-medium leading-normal">投稿した数</p>
    </div>
    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 border border-[#E0E0E0]">
      <p className="text-[#141414] tracking-light text-2xl font-bold leading-tight">{likeCount}</p>
      <p className="text-neutral-500 text-base font-medium leading-normal">いいね数</p>
    </div>
  </div>
);

export default ProfileStats;