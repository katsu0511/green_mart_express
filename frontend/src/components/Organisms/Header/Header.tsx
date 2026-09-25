import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='header'>
      <div className='header-content'>
        <Link to='/' className='header-link'>Green Mart</Link>
        <Link to='/cart' className='header-image'>
          <img src='/cart.png' />
        </Link>
      </div>
    </header>
  );
}
