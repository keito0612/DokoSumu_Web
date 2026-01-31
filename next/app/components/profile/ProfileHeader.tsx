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
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* モバイル用 */}
      <div className='lg:hidden flex flex-col items-center'>
        <div className='pb-4'>
          <ProfileImage imageUrl={profile.image_path} sizes={100} />
        </div>
        <ProfileName name={profile.name} />
        {
          isEditPage && <ProfileEditButton className='py-3' />
        }
        <ProfileStats postCount={profile.reviews_count} likeCount={profile.liked_reviews_count} />
        <ProfileDetail detail={profile.comment} />
      </div>
      {/* パソコンサイズ */}
      <div className="hidden lg:flex items-start w-full gap-6">
        <div className='flex-shrink-0'>
          <ProfileImage imageUrl={profile.image_path} sizes={120} />
        </div>
        <div className='flex flex-col w-full'>
          <div className="flex flex-row pb-3 justify-between items-center">
            <ProfileName name={profile.name} />
            {
              isEditPage && <ProfileEditButton />
            }
          </div>
          <ProfileStats postCount={profile.reviews_count} likeCount={profile.liked_reviews_count} />
          <ProfileDetail detail={profile.comment} />
        </div>
      </div>
    </div>
  )
}


export default ProfileHeader;