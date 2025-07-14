interface ProfileDetailProps {
  detail: string;
}
const ProfileDetail: React.FC<ProfileDetailProps> = ({ detail }) => (
  <div className="w-full flex flex-col sm:flex-row sm:items-start justify-start gap-1 sm:gap-0">
    <p className="text-neutral-500 text-base font-medium leading-normal w-full break-all whitespace-pre-line">
      {detail}
    </p>
  </div>
);

export default ProfileDetail;