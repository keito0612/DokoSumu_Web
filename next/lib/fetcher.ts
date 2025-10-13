import { AuthService } from "@/service/authServise";

export const fetcher = async (url: string) => {
  const token = AuthService.getSesstion();

  if (!token) {
    throw new Error('No token found');
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
};