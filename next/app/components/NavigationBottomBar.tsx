// components/NavigationBottomBar.jsx
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

const NavigationBottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/home', icon: HomeIcon },
    { label: 'Profile', href: '/profile', icon: UserIcon },
  ];


  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md sm:hidden">
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
