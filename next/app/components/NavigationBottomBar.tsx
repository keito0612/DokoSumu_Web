"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UserIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';

const NavigationBottomBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/home', icon: HomeIcon },
    { label: 'Profile', href: '/profile', icon: UserIcon },
    { label: '設定', href: '/setting', icon: Cog8ToothIcon }
  ];


  return (
    <nav className="fixed  bottom-0 left-0 right-0 bg-white border-t shadow-md sm:hidden">
      <ul className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} passHref>
              <div
                className={`flex flex-col items-center text-sm ${pathname === item.href ? 'text-green-500' : 'text-gray-500'
                  }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span className={`${pathname === item.href ? 'text-green-500' : 'text-gray-500'}`} >{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBottomBar;
