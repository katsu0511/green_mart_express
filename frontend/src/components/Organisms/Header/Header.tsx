import './Header.css';
import { useState } from 'react';
import useAuth from '@/lib/useAuth';
import useForm from '@/lib/useForm';
import { handleLogout } from '@/lib/auth';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const { clearAuth, isAuthenticated } = useAuth();
  const { navigate } = useForm();

  const logout = async () => {
    const error = await handleLogout();
    if (error) return;
    clearAuth();
    setShowPopup(false)
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='header-content'>
        <Link to='/' className='header-link' onClick={() => setShowPopup(false)}>Green Mart</Link>
        <div className='header-image' onClick={() => setShowPopup(!showPopup)}>
          <img src='/icon.png' />
        </div>
        {
          showPopup &&
          <div className='header-popup'>
            {
              isAuthenticated ?
              <div className='header-popup__menu'>
                <Link to='/cart' className='header-popup__link' onClick={() => setShowPopup(false)}>
                  <img src='/cart.png' className='header-popup__image' />
                  <span className='header-popup__label'>Cart</span>
                </Link>
                <Link to='/order' className='header-popup__link' onClick={() => setShowPopup(false)}>
                  <img src='/order.png' className='header-popup__image' />
                  <span className='header-popup__label'>Order</span>
                </Link>
                <div className='header-popup__link logout-button' onClick={logout}>
                  <span className='header-popup__label'>Logout</span>
                </div>
              </div>
              :
              <div className='header-popup__menu'>
                <Link to='/login' className='header-popup__link' onClick={() => setShowPopup(false)}>
                  <img src='/login.png' className='header-popup__image' />
                  <span className='header-popup__label'>Login</span>
                </Link>
              </div>
            }
          </div>
        }
      </div>
    </header>
  );
}
