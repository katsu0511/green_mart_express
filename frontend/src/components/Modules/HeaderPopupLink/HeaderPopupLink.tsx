import './HeaderPopupLink.css';
import { Link } from 'react-router-dom';

type Props = {
  link: string
  display: string
  setShowPopup: (showPopup: boolean) => void
};

export default function HeaderPopupLink({ link, display, setShowPopup }: Props) {
  return (
    <Link to={`/${link}`} className='header-popup__link' onClick={() => setShowPopup(false)}>
      <img src={`/${link}.png`} className='header-popup__image' />
      <span className='header-popup__label'>{display}</span>
    </Link>
  );
}
