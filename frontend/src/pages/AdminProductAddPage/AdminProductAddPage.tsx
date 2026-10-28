import './AdminProductAddPage.css';
import { useState } from 'react';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { handleSignup } from '@/lib/auth';
import Heading from '@/components/Atoms/Heading/Heading';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

export default function AdminProductAddPage() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, navigate } = useForm();
  const { refreshAuth } = useAuth();

  const addProduct = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasClicked(true);
    setError('');

    if (password !== passwordConfirm) {
      setError('Password doesn\'t match');
      setHasClicked(false);
      return;
    }

    const error = await handleSignup(name, email, password);

    if (error) {
      setError(error.message);
      setHasClicked(false);
      return;
    }

    await refreshAuth();

    navigate('/cart');
  };

  return (
    <div className='product-add-page'>
      <form className='product-add-form' onSubmit={addProduct}>
        <Heading title='New Product' />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormInput label='Price' type='number' value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
        <FormInput label='Stock' type='number' value={stock.toString()} onChange={(e) => setStock(Number(e.target.value))} />
        <FormButton usage='Add' error={error} hasClicked={hasClicked} />
        <PageLink path='../login' display='Login' />
      </form>
    </div>
  );
}
