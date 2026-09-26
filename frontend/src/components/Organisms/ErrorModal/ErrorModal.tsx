import './ErrorModal.css';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import { Button } from '@mui/material';

export default function ErrorModal() {
  const { errorMessage, setErrorMessage, setDisplayErrorModal } = useModal();
  const { navigate } = useForm();

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
