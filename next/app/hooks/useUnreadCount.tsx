'use client'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher';

export function useUnreadCount() {
  const { data, error } = useSWR<{ unread_count: number }>(
    `${process.env.NEXT_PUBLIC_API_BASE}/notifications/unread-count`,
    fetcher,
    {
      refreshInterval: 30_000,
    },
  );

  return {
    count: data?.unread_count ?? 0,
    isLoading: !error && data === undefined,
    isError: !!error,
  };
}