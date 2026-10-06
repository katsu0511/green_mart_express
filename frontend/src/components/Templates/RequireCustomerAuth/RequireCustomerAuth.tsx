import useAuth from '@/lib/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
