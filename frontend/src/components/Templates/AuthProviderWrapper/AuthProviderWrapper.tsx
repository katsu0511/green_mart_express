import { useState, useEffect } from 'react';
import type { AppUser } from '@/types/user';
import AuthContext from '@/lib/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include',
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data: AppUser = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshAuth();
  }, []);

  const clearAuth = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;
  const isCustomer = user !== null && user.role === 'CUSTOMER';
  const isAdmin = user !== null && user.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isCustomer, isAdmin, isLoading, refreshAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
