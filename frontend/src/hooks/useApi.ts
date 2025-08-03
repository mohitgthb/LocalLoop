import { useAuth } from '../context/AuthContext';

export const useApi = () => {
  const { token, logout } = useAuth();

  // Generic fetch for protected routes
  const fetchProtected = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.status === 401) {
      // Optional: handle token expired
      console.log('Access token expired — maybe refresh or logout');
      logout(); // or auto-refresh logic here
    }

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
  };

  return { fetchProtected };
};
