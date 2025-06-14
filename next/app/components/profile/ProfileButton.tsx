"use client";

import Link from "next/link";


const ProfileEditButton: React.FC = () => {
  return (
    <Link href='/profileEditModal'>
      <button className="w-40 border border-green-500 bg-transparent text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition" >
        <span className="text-sm font-semibold">プロフィールを編集</span>
      </button >
    </Link>
  )
};

export default ProfileEditButton;