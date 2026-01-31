"use client";

import Link from "next/link";

interface ProfileEditButtonProps {
  className?: string;
}

const ProfileEditButton: React.FC<ProfileEditButtonProps> = ({ className = "" }: ProfileEditButtonProps) => {
  return (
    <div className={className}>
      <Link href='/profileEditModal'>
        <button className="px-5 py-2 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-sm">
          編集
        </button>
      </Link>
    </div>
  )
};

export default ProfileEditButton;