import React from 'react'
import NotificationTile from './NoticationTile';
import { Notification } from '@/types';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  if (notifications.length === 0) {
    return <p className="text-center text-black mt-6">通知はありません。</p>;
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification: Notification, index: number) => (
        <NotificationTile key={index} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;