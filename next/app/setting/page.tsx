"use client";
import { useEffect, useState } from 'react';
import {
  MdChevronRight,
  MdEmail,
  MdLogout,
  MdLogin,
  MdPrivacyTip,
  MdDescription,
  MdContactSupport
} from 'react-icons/md';
import NavBar from '../components/NavBar';
import NavigationBottomBar from '../components/NavigationBottomBar';
import { IconType } from 'react-icons/lib';
import Modal from '../components/Modal';
import { ResultType, UserSetting } from '@/types';
import { UtilApi } from '@/Util/Util_api';
import { AuthService } from '@/service/authServise';
import { useRouter } from 'next/navigation';
import Loading2 from '../components/Loading2';
import Link from 'next/link';

interface SettingItemProps {
  icon: IconType;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}


export default function SettingsPage() {
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isConfirmModal, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const SettingItem = ({ icon: Icon, title, subtitle, action, onClick }: SettingItemProps) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Icon size={20} className="text-green-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      {action || <MdChevronRight size={20} className="text-gray-400" />}
    </div>
  );

  const Toggle = ({ checked, onChange }: ToggleProps) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'
        }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'
          }`}
      />
    </button>
  );

  const Section = ({ title, children }: SectionProps) => {
    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 px-4">{title}</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {children}
        </div>
      </div>
    )
  }
  const LoginButton = () => {
    return (
      <button onClick={() => onClick('/login')} className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center gap-3 text-green-600 hover:bg-red-50 transition-colors font-medium">
        <MdLogin size={20} />
        ログイン
      </button>
    );
  }

  const LogoutButton = () => {
    return (
      <button onClick={logoutClick} className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 transition-colors font-medium">
        <MdLogout size={20} />
        ログアウト
      </button>
    );
  }

  const onConfirm = async () => {
    setIsModalOpen(false);
    await logout();
  }
  const onClone = () => {
    router.refresh();
    window.location.reload();
  }

  const onEmailNotificationsClick = async () => {
    await emailNotification();
  }
  const emailNotification = async () => {
    const url = `${UtilApi.API_URL}/api/user_setting/email_notification`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getSesstion()}`,
        },
      });
      if (res.ok) {
        setEmailNotifications(!emailNotifications);
      } else {
        console.log(res.json());
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  const logout = async () => {
    const url = `${UtilApi.API_URL}/api/logout`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getSesstion()}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Request failed: ${res.status} - ${errorText}`);
      }

      setModalType('Success');
      setModalTitle('ログアウトが完了しました');
      setModalMessage('');
      setIsConfirmModalOpen(true);
      AuthService.deleteSesstion();
    } catch (error) {
      setModalType('Success');
      setModalTitle('ログアウトに失敗しました。');
      setModalMessage('もう一度お試しください。問題が続く場合は、ページを再読み込みしてください。');
      setIsConfirmModalOpen(true);
      console.error("Failed to fetch user:", error);
    }
  };


  const logoutClick = async () => {
    setModalType('Normal');
    setModalTitle('ログアウト');
    setModalMessage('ログアウトしますか？');
    setIsModalOpen(true);
  }


  const onClick = (path: string) => {
    router.push(path);
  }

  useEffect((() => {
    setToken(AuthService.getSesstion);
    const getUserSetting = async () => {
      setIsLoading(true);
      const url = `${UtilApi.API_URL}/api/user_setting`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getSesstion()}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const userSetting = data['user_setting'] as UserSetting;
          setEmailNotifications(userSetting.email_notification);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (AuthService.getSesstion() !== null) {
      getUserSetting();
    }
  }), [])
  return (
    <>
      {isLoading &&
        <Loading2 loadingtext={'読み込み中'} />
      }
      <div className="min-h-screen bg-gray-50">
        <NavBar title={'設定'} />
        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-6 mt-14 ">
            <h1 className="text-3xl font-bold text-gray-900 sm:flex items-center hidden ">
              設定
            </h1>
          </div>
          {
            token &&
            <Section title={'通知設定'}>
              <SettingItem
                icon={MdEmail}
                title="メール通知"
                subtitle="重要な更新をメールで受け取る"
                action={<Toggle checked={emailNotifications} onChange={async () => {
                  await onEmailNotificationsClick();
                }} />} onClick={onEmailNotificationsClick} />

            </Section>
          }
          <Section title={'その他'} >
            <SettingItem
              icon={MdDescription}
              title="利用規約" subtitle={undefined} action={undefined} onClick={() => {
                onClick('/terms-of-service');
              }} />
            <SettingItem
              icon={MdPrivacyTip}
              title="プライバシーポリシー" subtitle={undefined} action={undefined} onClick={() => {
                onClick('/privacy-policy');
              }} />
            <Link href={'https://docs.google.com/forms/d/e/1FAIpQLSe4hUxg84q0M53ruYppi7H-7Fiyx8zW-z5vfi_fmhB__vF9kg/viewform?usp=dialog'}>
              <SettingItem
                icon={MdContactSupport}
                title="お問い合わせ"
                subtitle="ご質問やご意見をお聞かせください" action={undefined} onClick={undefined} />
            </Link>
          </Section>
          {/* Logout Button */}
          <div className="mb-8">


            {
              token !== null ?
                LogoutButton() : LoginButton()
            }
          </div>
          <NavigationBottomBar />
        </main>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        message={modalMessage}
        title={modalTitle}
        onConfirm={onConfirm}
      />
      {/* ログアウトの処理が終わった後のモーダル */}
      <Modal
        isOpen={isConfirmModal}
        onClose={onClone}
        type={modalType}
        message={modalMessage}
        title={modalTitle}
        onConfirm={onConfirm}
      />
    </>
  );

}