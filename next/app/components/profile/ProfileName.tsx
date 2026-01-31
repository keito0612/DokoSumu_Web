"use client";
interface ProfileNameProps {
  name: string | null;
}
const ProfileName: React.FC<ProfileNameProps> = ({ name }) => (
  <div className="text-center lg:text-left">
    <p className="text-gray-900 text-xl lg:text-2xl font-bold">
      {name ?? ""}
    </p>
  </div>
);

export default ProfileName;