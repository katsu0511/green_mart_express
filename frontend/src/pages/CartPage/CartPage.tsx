import useForm from '@/lib/useForm';
import { handleLogout } from '@/lib/auth';

export default function CartPage() {
  const { navigate } = useForm();

  const logout = async() => {
    const error = await handleLogout();
    if (error) return;
    navigate('/login');
  };

  return (
    <div>
      <p>CartPage</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
