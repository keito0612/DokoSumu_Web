interface ProfileDetailProps {
  detail: string;
}
const ProfileDetail: React.FC<ProfileDetailProps> = ({ detail }) => (
  <div className='w-full  flex flex-row justify-start　'>
    <p className='pr-3 font-bold text-black '>自己紹介</p>
    <p className="text-neutral-500 text-base font-medium leading-normal w-3/4">{detail}</p>
  </div>
);

export default ProfileDetail;