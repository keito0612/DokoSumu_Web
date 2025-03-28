"use client"
import { useState } from 'react';

// ProfileAvatar Component
const ProfileAvatar = () => (
  <div
    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 sm:w-32 sm:h-32"
    style={{
      backgroundImage:
        'url("https://cdn.usegalileo.ai/sdxl10/b1ba1f1b-c868-4445-9ede-e71b03a48fbf.png")',
    }}
  />
);

// ProfileDetails Component
interface ProfileNameProps {
  name: string;
}
const ProfileName: React.FC<ProfileNameProps> = ({ name }) => (
  <div className="flex  justify-center items-center text-center ">
    <p className="text-[#141414] text-[22px] font-bold leading-tight pt-11 tracking-[-0.015em]">
      {name}
    </p>
  </div>
);


interface ProfileDetailProps {
  detail: string;
}
const ProfileDetail: React.FC<ProfileDetailProps> = ({ detail }) => (
  <div className='w-full  flex flex-row justify-start　'>
    <p className='pr-3 font-bold text-black '>自己紹介</p>
    <p className="text-neutral-500 text-base font-medium leading-normal w-3/4">{detail}</p>
  </div>
);


// ProfileActions Component
const ProfileActions = () => (
  <button className="w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-lime-500 text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 sm:flex-auto">
    <span className="truncate">Edit Profile</span>
  </button>
);

// ProfileStats Component
interface ProfileStatsProps {
  postCount: number;
  likeCount: number;
}
const ProfileStats: React.FC<ProfileStatsProps> = ({ postCount, likeCount }) => (
  <div className="flex flex-row gap-4 p-4 justify-start">
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

// TabButton Component
const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`py-2 px-4 text-sm font-bold rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#39E079] text-white' : 'bg-[#F4F4F4] text-[#141414]'
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);

// PostList Component
const PostList = ({ posts }) => (
  <div className="flex flex-col gap-4">
    {posts.map((post, index) => (
      <div key={index} className="flex flex-col p-4 border border-[#E0E0E0] rounded-xl">
        <p className="text-[#141414] font-medium text-lg">{post.title}</p>
        <p className="text-neutral-500 text-sm">{post.content}</p>
      </div>
    ))}
  </div>
);

// ProfilePage Component
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'likes'
  const posts = [
    { title: 'My First Post', content: 'This is the content of my first post.' },
    { title: 'Another Post', content: 'This is some content for another post.' },
  ];

  const likedPosts = [
    { title: 'Liked Post 1', content: 'This post has received a lot of likes!' },
    { title: 'Liked Post 2', content: 'This is another post with lots of likes!' },
  ];

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <div className="px-4 sm:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex p-4 flex-col  gap-4">
            <div className="flex gap-4  flex-row items-start">
              <ProfileAvatar />
              <ProfileName name='テストアカウント' />
            </div>
            <ProfileDetail detail='テストテストテスyとテストテストテストテストテストテストテストテストテストテストテストテスト' />
            <ProfileActions />
          </div>
          <ProfileStats postCount={8} likeCount={1} />
          <div className="mt-6 pl-4 pr-4">
            <div className="flex gap-4 justify-center sm:justify-start">
              <TabButton isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
                My Posts
              </TabButton>
              <TabButton isActive={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
                Liked Posts
              </TabButton>
            </div>
            <div className="mt-4">
              {activeTab === 'posts' ? <PostList posts={posts} /> : <PostList posts={likedPosts} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
