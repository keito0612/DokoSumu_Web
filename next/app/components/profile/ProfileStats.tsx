"use client";
interface ProfileStatsProps {
  postCount: number;
  likeCount: number;
}
const ProfileStats: React.FC<ProfileStatsProps> = ({ postCount, likeCount }) => (
  <div className="flex flex-row justify-start xl:gap-6 gap-24" >
    <div className="flex  flex-col rounded-xl">
      <p className="text-[#141414] tracking-light text-3xl font-bold text-center leading-tight">{postCount}</p>
      <p className="text-neutral-500 text-base font-medium leading-normal">投稿した数</p>
    </div>
    <div className="flex flex-col ">
      <p className="text-[#141414] tracking-light text-3xl font-bold text-center leading-tight">{likeCount}</p>
      <p className="text-neutral-500 text-base font-medium leading-normal">いいね数</p>
    </div>
  </div>
);

export default ProfileStats;