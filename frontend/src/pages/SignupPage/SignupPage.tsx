import './SignupPage.css';
import { useState } from 'react';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { handleSignup } from '@/lib/auth';
import Heading from '@/components/Atoms/Heading/Heading';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

export default function SignupPage() {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, navigate } = useForm();
  const { refreshAuth } = useAuth();

  const signup = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasClicked(true);
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      setHasClicked(false);
      return;
    }

    if (!birthDate.trim()) {
      setError('Please enter your birth date');
      setHasClicked(false);
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email');
      setHasClicked(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      setHasClicked(false);
      return;
    }

    if (!passwordConfirm.trim()) {
      setError('Please enter password confirmation');
      setHasClicked(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError('Password doesn\'t match');
      setHasClicked(false);
      return;
    }

    const error = await handleSignup(name, birthDate, email, password);

    if (error) {
      setError(error.message);
      setHasClicked(false);
      return;
    }

    await refreshAuth();

    navigate('/cart');
  };

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={signup}>
        <Heading title='Signup' />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Birth Date' type='date' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <FormInput label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <FormInput label='Password Confirm' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <FormButton usage='Signup' error={error} hasClicked={hasClicked} />
        <PageLink path='../login' display='Login' />
      </form>
    </div>
  );
}
