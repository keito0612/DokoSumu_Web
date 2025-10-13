"use client";

import React from "react";
import {
  FiTrendingUp,
  FiBell,
} from "react-icons/fi";
import ProfileImage from "../profile/ProfileImage";
import { Notification, NotificationType } from "@/types";
import { useRouter } from "next/navigation";

interface NotificationTileProps {
  notification: Notification;
}

const NotificationTile = ({ notification }: NotificationTileProps) => {
  const router = useRouter();
  const getIcon = () => {
    switch (notification.type) {
      case NotificationType.POST:
        return <FiTrendingUp className="text-green-500 text-2xl" />;
      case NotificationType.NOTICE:
        return <FiBell className="text-yellow-500 text-2xl" />;
      default:
        return <FiTrendingUp className="text-gray-400 text-2xl" />;
    }
  };

  const renderLeftIcon = () => {
    // いいね通知のときはプロフィール画像を表示
    if (notification.type === NotificationType.LIKE) {
      return (
        <ProfileImage imageUrl={notification.liked_by_user?.image_path ?? null} sizes={45} />
      );
    }
    return <div>{getIcon()}</div>;
  };

  const onClick = () => {
    router.push(`/notifications/detail/${notification.id}`);
  }

  return (
    <div onClick={onClick} className="flex justify-between items-start bg-white border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition">
      <div className="flex items-start gap-1">
        <div className="flex-shrink-0">
          {renderLeftIcon()}
        </div>
        <div>
          <p className="font-semibold text-sm sm:text-base md:text-base xl:text-base 2xl:text-base  text-gray-900">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.content}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 whitespace-nowrap">{notification.time}</p>
    </div>
  );
};

export default NotificationTile;
