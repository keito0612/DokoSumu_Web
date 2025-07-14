"use client";
import NavigationBottomBar from '../components/NavigationBottomBar';
import NavBar from '../components/NavBar';
import ProfileBody from '@/app/components/profile/ProfileBody';
import { AuthService } from '@/service/authServise';
import { redirect } from 'next/navigation';



const ProfilePage = () => {
  const token = AuthService.getSesstion();

  if (!token) {
    redirect('home')
  }

  return (
    <div className="relative flex w-full min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}>
      <NavBar title="プロフィール" />
      <ProfileBody />
      <NavigationBottomBar />
    </div>
  )
}

export default ProfilePage
