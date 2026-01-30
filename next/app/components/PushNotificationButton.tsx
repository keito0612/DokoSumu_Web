'use client';

import { usePushNotification } from '@/app/hooks/usePushNotification';

export default function PushNotificationButton() {
  const { permission, requestPermission } = usePushNotification();

  if (permission === 'granted') {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <span>プッシュ通知: 有効</span>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <span>プッシュ通知: ブロック中</span>
        <p className="text-sm text-gray-500">
          ブラウザの設定から通知を許可してください
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={requestPermission}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      プッシュ通知を有効にする
    </button>
  );
}
