import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { handleLogout } from '@/lib/auth';

export default function CartPage() {
  const { navigate } = useForm();
  const { clearAuth } = useAuth();

  const logout = async() => {
    const error = await handleLogout();
    if (error) return;
    clearAuth();
    navigate('/login');
  };

  return (
    <div>
      <p>CartPage</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
