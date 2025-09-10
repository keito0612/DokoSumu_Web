"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ResultType, User } from "@/types";
import { UtilApi } from "@/Util/Util_api";
import { AuthService } from "@/service/authServise";
import ProfileImage from "./profile/ProfileImage";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface NavBarProps {
  title: string;
}

const navigation = [
  { name: "ホーム", href: "/home" },
  { name: "ログイン", href: "/login" },
  { name: "新規登録", href: "/sinUp" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ title }: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isConfirmModal, setIsConfirmModalOpen] = useState(false);


  const getUser = async () => {
    const url = `${UtilApi.API_URL}/api/user`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getSesstion()}`,
        },
      });
      const data = await res.json();
      const user: User = data["user"] as User;
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const logoutClick = async () => {
    setModalType('Normal');
    setModalTitle('ログアウト');
    setModalMessage('ログアウトしますか？');
    setIsModalOpen(true);
  }

  const onConfirm = async () => {
    setIsModalOpen(false);
    await logout();
  }
  const onClone = () => {
    router.refresh();
    window.location.reload();
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

  useEffect(() => {
    setMounted(true);
    const session = AuthService.getSesstion();
    if (session) {
      setToken(session);
      getUser();
    }
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-green-500 fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center sm:justify-between">
            {/* モバイルメニュー（ハンバーガーアイコン） */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">メインメニューを開く</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            {/* 左側のロゴ・タイトル */}
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  className="w-0 sm:h-8 sm:w-auto invisible sm:visible"
                />
                <span className="text-white visible sm:hidden text-center text-lg font-bold">
                  {title}
                </span>
              </div>

              {/* PC用ナビゲーション */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation
                    .filter((item) => {
                      if (mounted && token) {
                        return item.name !== "ログイン" && item.name !== "新規登録";
                      }
                      return true;
                    })
                    .map((item) => {
                      const isCurrent = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={classNames(
                            isCurrent
                              ? "bg-green-600 text-white"
                              : "text-gray-300 hover:bg-green-600 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* 右側のユーザー情報 */}
            {mounted && (
              <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex flex-row items-center justify-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 bg-white focus:bg-slate-400 z-10">
                        <ProfileImage
                          imageUrl={user?.image_path ?? null}
                          sizes={36}
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem>
                        <Link
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          href={"/profile"}
                        >
                          プロフィール
                        </Link>
                      </MenuItem>
                      {
                        token ?
                          <MenuItem as="button" onClick={logoutClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            サインアウト
                          </MenuItem> : null
                      }
                    </MenuItems>
                  </Menu>
                  <p className="font-bold ml-4">{user?.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* モバイル用メニュー */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation
              .filter((item) => {
                if (mounted && token) {
                  return item.name !== "ログイン" && item.name !== "新規登録";
                }
                return true;
              })
              .map((item) => {
                const isCurrent = pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={classNames(
                      isCurrent
                        ? "bg-green-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {/* ログアウト確認用モーダル */}
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

export default NavBar;
