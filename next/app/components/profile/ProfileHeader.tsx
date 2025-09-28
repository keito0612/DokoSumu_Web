import { Profile } from '@/types'
import React from 'react'
import ProfileImage from './ProfileImage'
import ProfileEditButton from './ProfileButton'
import { usePathname } from 'next/navigation'
import ProfileName from './ProfileName'
import ProfileDetail from './ProfileDetail'
import ProfileStats from './ProfileStats'


interface ProfileHeaderProps {
  profile: Profile
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const pathname = usePathname();
  const isEditPage = pathname === "/profile";
  return (
    <>
      <div className="flex py-10 flex-col gap-4">
        {/* モバイル用 */}
        <div className='xl:hidden flex flex-col items-center'>
          <div className='pb-4'>
            <ProfileImage imageUrl={profile.image_path} sizes={120} />
          </div>
          <ProfileName name={profile.name} />
          {
            isEditPage && <ProfileEditButton className='py-4' />
          }
          <ProfileStats postCount={profile.reviews_count} likeCount={profile.liked_reviews_count} />
        </div>
        {/* パソコンサイズ */}
        <div className="hidden xl:flex items-center w-full">
          <div className='pr-5'>
            <ProfileImage imageUrl={profile.image_path} sizes={120} />
          </div>
          <div className='flex flex-col w-full'>
            <div className="flex flex-row pb-3 justify-between">
              <ProfileName name={profile.name} />
              {
                isEditPage && <ProfileEditButton />
              }
            </div>
            <ProfileStats postCount={profile.reviews_count} likeCount={profile.liked_reviews_count} />
          </div>
        </div>
      </div>
      <ProfileDetail detail={profile.comment} />
    </>
  )
}


export default ProfileHeader;