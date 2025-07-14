'use client';         // CSR 必須（SWR を使うため）
import { BellIcon } from '@heroicons/react/24/outline';
import { useUnreadCount } from '../hooks/useUnreadCount';


export default function NotificationBell() {
  const { count, isLoading, isError } = useUnreadCount();

  if (isError) return <BellIcon aria-hidden="true" className="h-6 w-6 text-white" />;
  // 読み込み中は数字なしで表示
  const showBadge = !isLoading && count > 0;
  const badgeText = count > 99 ? '99+' : count >= 1 ? '1+' : '';

  return (
    <div className="relative inline-block">
      <BellIcon aria-hidden="true" className="h-6 w-6 text-white" />

      {showBadge && (
        <span
          className="
            absolute -top-1 -right-1
            flex h-4 min-w-[1rem] items-center justify-center
            rounded-full bg-red-500 px-1
            text-[10px] font-bold leading-none text-white
          "
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}