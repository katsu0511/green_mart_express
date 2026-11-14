import './AdminCategoryAddPage.css';
import { useState } from 'react';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import Heading from '@/components/Atoms/Heading/Heading';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminCategoryAddPage() {
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { error, setError, navigate } = useForm();
  const { refreshAuth } = useAuth();

  const addCategory = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasClicked(true);
    setError('');

    if (!name.trim()) {
      setError('Please enter a category name');
      setHasClicked(false);
      return;
    }

    if (!slug.trim()) {
      setError('Please enter a category slug');
      setHasClicked(false);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, slug }),
    });

    if (res.ok) {
      navigate('/admin/categories');
    } else if (res.status === 401) {
      await refreshAuth();
      navigate('/login');
    } else {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }
  };

  return (
    <div className='category-add-page'>
      <form className='category-add-form' onSubmit={addCategory}>
        <Heading title='New Category' />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Slug' type='text' value={slug} onChange={(e) => setSlug(e.target.value)} />
        <FormButton usage='Add' error={error} hasClicked={hasClicked} />
        <PageLink path='./..' display='Category List' />
      </form>
    </div>
  );
}
