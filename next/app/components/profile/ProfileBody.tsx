"use client";
import { UtilApi } from '@/Util/Util_api';
import { Profile, ResultType } from '@/types';
import ProfileList from './ProfileList';
import { AuthService } from '@/service/authServise';
import ProfileSkeleton from '../ProfileSkeleton';
import { useEffect, useState } from 'react';
import Modal from "@/app/components/Modal";
import { notFound, useParams, useRouter } from 'next/navigation';
import ProfileHeader from './ProfileHeader';

const ProfileBody: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  async function getProfile() {
    const userId = params.user_id;
    let url: string = '';
    try {
      if (userId === undefined) {
        url = `${UtilApi.API_URL}/api/profile`;
      } else {
        url = `${UtilApi.API_URL}/api/profile/detail/${userId}`;
      }
      const token = AuthService.getSesstion();
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (res.ok) {
        const data = await res.json();
        const profileData: Profile = data['profile'] as Profile;
        setProfile(profileData);
      } else if (res.status === 401) {
        setProfile(null);
        router.push("/unauthorized")
      } else if (res.status === 404) {
        notFound();
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (e) {
      console.error("プロフィール取得エラー:", e);
    }
  }


  async function deleteReview(id: number) {
    try {
      const url: string = `${UtilApi.API_URL}/api/post/review/delete/${id}`;
      const token = AuthService.getSesstion();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      setIsConfirmModalOpen(false);
      if (res.ok) {
        setIsResultModalOpen(true);
        setModalType('Success');
        setModalTitle('投稿を削除しました。');
        setModalMessage('');
        setIsSkeleton(false);
      } else if (res.status === 404) {
        setIsResultModalOpen(true);
        setModalType('Error');
        setModalTitle('投稿を削除できませんでした。');
        setModalMessage('削除する投稿が見つかりませんでした。もう一度お試しください。');
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (e) {
      setIsConfirmModalOpen(true);
      setModalType('Error');
      setModalTitle('投稿を削除できませんでした。');
      setModalMessage('サーバーの不具合により投稿を削除できませんでした。もう一度お試しください。');
      console.error("プロフィール取得エラー:", e);
    }
  }

  const handleClose = async () => {
    if (modalType === 'Warning') {
      setIsConfirmModalOpen(false);
    } else if (modalType === 'Success') {
      setIsResultModalOpen(false);
      window.location.reload();
    } else {
      setIsResultModalOpen(false);
    }
  };

  const onConfirm = async () => {
    await deleteReview(selectedReviewId!);
  };


  useEffect(() => {
    (async () => {
      setMounted(true);
      setIsSkeleton(true);
      await getProfile();
      setIsSkeleton(false);
    })()
  }, []);

  if (!mounted || isSkeleton || !profile) {
    return <ProfileSkeleton />;
  }
  return (
    < div className="px-4 sm:px-20 flex flex-1 justify-center py-5 pt-16  pb-24  sm:pb-0 md:pb-0 lg:pb-0 2xl:pb-0 xl:pb-0 " >
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <ProfileHeader profile={profile} />
        <ProfileList postReviews={profile.reviews} likedReviews={profile.liked_reviews} onMenuAction={async (action, id) => {
          setSelectedReviewId(id);
          if (action === "edit") {
            router.push(`/post/edit/${id}`);
          } else {
            setIsConfirmModalOpen(true);
            setModalType('Warning');
            setModalTitle('投稿を削除しますか？');
            setModalMessage('一度削除した投稿は復元できません。');
          }
        }}></ProfileList>
      </div>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={handleClose}
        onConfirm={onConfirm}
        type={modalType}
        message={modalMessage}
        title={modalTitle} />
      <Modal
        isOpen={isResultModalOpen}
        onClose={handleClose}
        onConfirm={onConfirm}
        type={modalType}
        message={modalMessage}
        title={modalTitle} />
    </div >
  );
}

export default ProfileBody;