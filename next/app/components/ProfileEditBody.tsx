import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { AuthService } from '@/service/authServise';
import { UtilApi } from '@/Util/Util_api';
import { User } from '@/types';
import ProfileStats from './profile/ProfileStats';
import ProfileList from './profile/ProfileList';



const ProfileAvatar = () => (
  <div
    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-24 h-24 sm:w-32 sm:h-32"
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
  <div className="text-left ">
    <p className="text-[#141414] text-[22px] font-bold leading-tight pb-3 tracking-[-0.015em]">
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
const ProfileEditButton = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="w-40 border border-green-500 bg-transparent text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition">
    <span className="text-sm font-semibold">プロフィールを編集</span>
  </button>
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

const ProfileEditBody = async () => {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'likes'
  const posts = [
    { title: 'My First Post', content: 'This is the content of my first post.' },
    { title: 'Another Post', content: 'This is some content for another post.' },
  ];

  const likedPosts = [
    { title: 'Liked Post 1', content: 'This post has received a lot of likes!' },
    { title: 'Liked Post 2', content: 'This is another post with lots of likes!' },
  ];
  const router = useRouter();
  const userId = params.userId;
  const user: User = await getUser(userId);

  return (
    <div className="px-4 sm:px-20 flex flex-1 justify-center py-5 pt-16  pb-24  sm:pb-0 md:pb-0 lg:pb-0 2xl:pb-0 xl:pb-0 ">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex py-4 flex-col  gap-4">
          <div className="flex items-start justify-between w-full">
            <div className="flex gap-4 flex-row items-start">
              <ProfileAvatar />
            </div>

            <div className="flex flex-col justify-end h-full">
              <ProfileEditButton
                onClick={() => router.push("/profile/edit")}
              />
            </div>
          </div>
        </div>
        <ProfileName name="テストアカウント" />
        <ProfileDetail detail='テストテストテスyとテストテストテストテストテストテストテストテストテストテストテストテスト' />

        <ProfileStats postCount={8} likeCount={1} />
        <ProfileList postReviews={[]} likedReviews={[]} />
      </div>
    </div>
  )
}

async function getUser(userId: number) {
  const url: string = `${UtilApi.API_URL}/api/profile/${userId}`;
  const res = await fetch(url);
  return res.json();
}



export default ProfileEditBody;