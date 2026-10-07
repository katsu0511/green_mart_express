import useAuth from '@/lib/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAdminAuth() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
