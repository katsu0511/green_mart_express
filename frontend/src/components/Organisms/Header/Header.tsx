import './Header.css';
import { useState } from 'react';
import useAuth from '@/lib/useAuth';
import useForm from '@/lib/useForm';
import { handleLogout } from '@/lib/auth';
import { Link } from 'react-router-dom';
import HeaderPopupLink from '@/components/Modules/HeaderPopupLink/HeaderPopupLink';

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
            <div className='header-popup__menu'>
              {
                isAuthenticated ?
                <>
                  <HeaderPopupLink link='cart' display='Cart' setShowPopup={setShowPopup} />
                  <HeaderPopupLink link='orders' display='Order' setShowPopup={setShowPopup} />
                  <div className='header-popup__link logout-button' onClick={logout}>
                    <span className='header-popup__label'>Logout</span>
                  </div>
                </>
                :
                <HeaderPopupLink link='login' display='Login' setShowPopup={setShowPopup} />
              }
            </div>
          </div>
        }
      </div>
    </header>
  );
}
