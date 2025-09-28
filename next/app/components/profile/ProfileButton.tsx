"use client";

import Link from "next/link";

interface ProfileEditButtonProps {
  className?: string;
}

const ProfileEditButton: React.FC<ProfileEditButtonProps> = ({ className = "" }: ProfileEditButtonProps) => {
  return (
    <div className={className}>
      <Link href='/profileEditModal'>
        <button className="w-20 border border-green-500 bg-transparent text-green-500  py-1 rounded-xl hover:bg-green-500 hover:text-white transition" >
          <span className="text-lg font-semibold">編集</span>
        </button >
      </Link>
    </div>
  )
};

export default ProfileEditButton;