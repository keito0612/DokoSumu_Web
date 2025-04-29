"use client";
import { Suspense, useEffect, useState } from 'react';
import NavigationBottomBar from '../components/NavigationBottomBar';
import NavBar from '../components/NavBar';
import ProfileSkeleton from '../components/ProfileSkeleton';
import ProfileEditBody from '../components/ProfileEditBody';


// ProfilePage Component
const ProfilePage = () => {
  return (
    <div>
      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
      >
        <NavBar title='プロフィール' />
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileEditBody></ProfileEditBody>
        </Suspense>
        <NavigationBottomBar />
      </div>
    </div >
  );
};

export default ProfilePage;
