"use client";
interface ProfileNameProps {
  name: string | null;
}
const ProfileName: React.FC<ProfileNameProps> = ({ name }) => (
  <div className="text-left ">
    <p className="text-[#141414] text-[22px] font-bold leading-tight pb-2 tracking-[-0.015em]">
      {name ?? ""}
    </p>
  </div>
);

export default ProfileName;