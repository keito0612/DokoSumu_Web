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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sm:hidden safe-area-bottom">
      <ul className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <div
                  className={`flex flex-col items-center text-xs font-medium py-1 px-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-green-600 bg-green-50 scale-105'
                      : 'text-gray-500 hover:text-gray-700 active:scale-95'
                  }`}
                >
                  <item.icon className={`h-6 w-6 mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                  <span>{item.label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationBottomBar;
