"use client";
import { UtilApi } from '@/Util/Util_api';
import { Profile } from '@/types';
import ProfileName from './ProfileName';
import ProfileEditButton from './ProfileButton';
import ProfileStats from './ProfileStats';
import ProfileList from './ProfileList';
import { AuthService } from '@/service/authServise';
import ProfileSkeleton from '../ProfileSkeleton';
import ProfileDetail from './ProfileDetail';
import { useEffect, useState } from 'react';



const ProfileAvatar = () => (
  <div
    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-24 h-24 sm:w-32 sm:h-32"
    style={{
      backgroundImage:
        'url("https://cdn.usegalileo.ai/sdxl10/b1ba1f1b-c868-4445-9ede-e71b03a48fbf.png")',
    }}
  />
);

const ProfileBody: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(false);

  async function getProfile() {
    try {
      const url: string = `${UtilApi.local}api/profile`;
      const token = AuthService.getSesstion();
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (res.ok) {
        const data = await res.json();
        const profileData: Profile = data['profile'] as Profile;
        setProfile(profileData);
      } else if (res.status === 401) {
        setProfile(null);
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (e) {
      console.error("プロフィール取得エラー:", e);
    }
  }

  useEffect(() => {
    (async () => {
      setIsSkeleton(true);
      await getProfile();
      setIsSkeleton(false);
    })()
  }, []);
  if (isSkeleton || !profile) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="px-4 sm:px-20 flex flex-1 justify-center py-5 pt-16  pb-24  sm:pb-0 md:pb-0 lg:pb-0 2xl:pb-0 xl:pb-0 ">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex py-4 flex-col  gap-4">
          <div className="flex items-start justify-between w-full">
            <div className="flex gap-4 flex-row items-start">
              <ProfileAvatar />
            </div>

            <div className="flex flex-col justify-end h-full">
              <ProfileEditButton />
            </div>
          </div>
        </div>
        <ProfileName name={profile.name} />
        <ProfileDetail detail={profile.comment} />
        <ProfileStats postCount={profile.reviews_count} likeCount={profile.liked_reviews_count} />
        <ProfileList postReviews={profile.reviews} likedReviews={profile.likedReviews}></ProfileList>
      </div>
    </div>
  );
}

export default ProfileBody;