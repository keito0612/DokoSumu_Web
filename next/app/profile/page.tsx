"use client";
import NavigationBottomBar from '../components/NavigationBottomBar';
import NavBar from '../components/NavBar';
import ProfileBody from '@/app/components/profile/ProfileBody';



const ProfilePage = () => {
  return (
    <div className="relative flex w-full min-h-screen flex-col bg-gray-100 overflow-x-hidden" style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}>
      <NavBar title="プロフィール" />
      <ProfileBody />
      <NavigationBottomBar />
    </div>
  )
}

export default ProfilePage
