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
import ProfileImage from './ProfileImage';

const ProfileBody: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  async function getProfile() {
    try {
      const url: string = `${UtilApi.API_URL}/api/profile`;
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
      setMounted(true);
      setIsSkeleton(true);
      await getProfile();
      setIsSkeleton(false);
    })()
  }, []);
  if (!mounted || isSkeleton || !profile) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="px-4 sm:px-20 flex flex-1 justify-center py-5 pt-16  pb-24  sm:pb-0 md:pb-0 lg:pb-0 2xl:pb-0 xl:pb-0 ">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex py-4 flex-col  gap-4">
          <div className="flex items-start justify-between w-full">
            <div className="flex gap-4 flex-row items-start">
              <ProfileImage imageUrl={profile.image_path} />
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