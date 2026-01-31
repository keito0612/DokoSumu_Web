interface ProfileDetailProps {
  detail: string;
}
const ProfileDetail: React.FC<ProfileDetailProps> = ({ detail }) => {
  if (!detail) return null;
  return (
    <div className="w-full pt-2">
      <p className="text-gray-600 text-sm leading-relaxed break-all whitespace-pre-line">
        {detail}
      </p>
    </div>
  );
};

export default ProfileDetail;