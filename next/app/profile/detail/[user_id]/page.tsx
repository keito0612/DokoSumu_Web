"use client";
import NavBar from '@/app/components/NavBar';
import NavigationBottomBar from '@/app/components/NavigationBottomBar';
import ProfileBody from '@/app/components/profile/ProfileBody';

const ProfileDetailPage = () => {
  return (
    <div
      className="relative flex w-full min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <NavBar title={`ユーザー詳細`} />
      <ProfileBody />
      <NavigationBottomBar />
    </div>
  );
};

export default ProfileDetailPage;
