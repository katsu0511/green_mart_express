import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    error,
    setError,
    navigate
  };
};

export default useForm;
