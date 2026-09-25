import './SignupPage.css';
import { useState } from 'react';
import useForm from '@/lib/useForm';
import { handleSignup } from '@/lib/auth';
import Heading from '@/components/Atoms/Heading/Heading';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

export default function SignupPage() {
  const [name, setName] = useState<string>('');
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, navigate } = useForm();

  const signup = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasClicked(true);
    setError('');

    if (password !== passwordConfirm) {
      setError('Password doesn\'t match');
      setHasClicked(false);
      return;
    }

    const error = await handleSignup(name, email, passwordConfirm);

    if (error) {
      setError(error.message);
      setHasClicked(false);
      return;
    }

    navigate('/');
  };

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={signup}>
        <Heading title='Signup' />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <FormInput label='Password Confirm' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <FormButton usage='Signup' error={error} hasClicked={hasClicked} />
        <PageLink path='../login' display='Login' />
      </form>
    </div>
  );
}
