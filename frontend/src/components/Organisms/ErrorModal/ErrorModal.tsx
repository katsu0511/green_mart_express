import './ErrorModal.css';
import useModal from '@/lib/useModal';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ErrorModal() {
  const { errorMessage, setErrorMessage, setDisplayErrorModal } = useModal();
  const navigate = useNavigate();

  const onBackToHome = () => {
    setDisplayErrorModal(false);
    setErrorMessage('');
    navigate('/');
  };

  return (
    <div className='error-modal__background'>
      <div className='error-modal'>
        <div className='error-modal__content'>
          <p className='error-modal__message'>{errorMessage}</p>
          <Button
            variant='contained'
            color='error'
            onClick={onBackToHome}
            sx={{ color: 'white' }}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
