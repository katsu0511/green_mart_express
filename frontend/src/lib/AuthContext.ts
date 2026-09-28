import type { AppUser } from '@/types/user';
import { createContext } from 'react';

type AuthContextType = {
  user: AppUser | null
  isAuthenticated: boolean
  isLoading: boolean
  refreshAuth: () => Promise<void>
  clearAuth: () => void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
