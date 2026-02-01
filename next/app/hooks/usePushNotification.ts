'use client';

import { useEffect, useState, useCallback } from 'react';
import { messaging, getToken, onMessage } from '@/lib/firebase';
import { AuthService } from '@/service/authServise';
import { UtilApi } from '@/Util/Util_api';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export function usePushNotification() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    if (!messaging || !('Notification' in window)) {
      console.warn('Push notifications not supported');
      return null;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (token) {
          setFcmToken(token);
          await saveFcmTokenToServer(token);
        }

        return token;
      }

      return null;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return null;
    }
  }, []);

  const saveFcmTokenToServer = async (token: string) => {
    const authToken = AuthService.getSesstion();
    if (!authToken) return;

    try {
      await fetch(`${UtilApi.API_URL}/api/fcm/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ fcm_token: token }),
      });
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'お知らせ', {
          body: payload.notification?.body || '',
          icon: '/icon-192x192.png',
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    permission,
    fcmToken,
    requestPermission,
  };
}
