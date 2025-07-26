"use client"
import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { User } from '@/types';
import { UtilApi } from '@/Util/Util_api';
import { AuthService } from '@/service/authServise';
import ProfileImage from './profile/ProfileImage';


interface NavBarProps {
  title: string;
};

const initialNavigation = [
  { name: 'ホーム', href: '/home', current: true },
  { name: 'ログイン', href: '/login', current: false },
  { name: '新規登録', href: '/sinUp', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function NavBar({ title }: NavBarProps) {
  const [navigation, setNavigation] = useState(initialNavigation);

  const handleMenuClick = (href: string) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setNavigation(updatedNavigation);
  };

  const [user, setUser] = useState<User | null>();

  const getUser = async () => {
    const url = `${UtilApi.API_URL}/api/user`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getSesstion()}`,
      },
    });
    const data = await res.json();
    const user: User = data['user'] as User;
    setUser(user);
  }
  useEffect(() => {
    (async () => {
      if (AuthService.getSesstion()) {
        await getUser();
      }
    })()
  }, [])

  return (
    <Disclosure as="nav" className="bg-green-500 fixed top-0 left-0 w-full z-50 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center sm:justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-300  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">メインメニューを開く</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            {/* web用アイテム */}
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="w-0 sm:h-8 sm:w-auto invisible sm:visible"
              />
              {/* モバイル用のアイテム */}
              <span className="text-white  visible sm:hidden text-center text-lg font-bold">{title}</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-green-600 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 invisible sm:visible">
            {/* <button
              type="button"
              className="relative rounded-full bg-green-500 p-1   text-white outline-none ring-2 ring-white  hover:bg-green-300"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">通知を見る</span>
              <NotificationBell />
            </button> */}
            <div className="flex flex-row items-center justify-center">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 bg-white focus:bg-slate-400 z-10 ">
                    <ProfileImage imageUrl={user?.image_path ? user!.image_path : null} sizes={36} />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                >
                  <MenuItem>
                    <Link className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' href={"/profile"}>
                      プロフィール
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      サインアウト
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
              <p className='font-bold ml-4'>{user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              onClick={() => handleMenuClick(item.href)}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-green-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure >
  );
}

export default NavBar;