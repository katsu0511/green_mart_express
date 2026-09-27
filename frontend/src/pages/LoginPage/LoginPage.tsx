import './LoginPage.css';
import { useState } from 'react';
import useForm from '@/lib/useForm';
import { handleLogin } from '@/lib/auth';
import Heading from '@/components/Atoms/Heading/Heading';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

export default function LoginPage() {
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { email, setEmail, password, setPassword, error, setError, navigate } = useForm();

  const login = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasClicked(true);
    setError('');

    const error = await handleLogin(email, password);

    if (error) {
      setError(error.message);
      setHasClicked(false);
      return;
    }

    navigate('/cart');
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={login}>
        <Heading title='Login' />
        <FormInput label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <FormButton usage='Login' error={error} hasClicked={hasClicked} />
        <PageLink path='../signup' display='Signup' />
      </form>
    </div>
  );
}
