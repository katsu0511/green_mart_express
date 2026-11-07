import './AdminProductAddPage.css';
import { useState, useEffect } from 'react';
import type { Category } from '@/types/category';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import Heading from '@/components/Atoms/Heading/Heading';
import FormSelect from '@/components/Modules/FormSelect/FormSelect';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminProductAddPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { error, setError, navigate } = useForm();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);

      if (res.ok) {
        const categoryList: Category[] = await res.json();
        setCategories(categoryList);
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getCategories();
  }, [setErrorMessage, setDisplayErrorModal]);

  const addProduct = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasClicked(true);
    setError('');

    if (category === null) {
      setError('Please select a category');
      setHasClicked(false);
      return;
    }

    if (!name.trim()) {
      setError('Please enter a product name');
      setHasClicked(false);
      return;
    }

    if (!description.trim()) {
      setError('Please enter a product description');
      setHasClicked(false);
      return;
    }

    if (!Number.isInteger(price) || price <= 0) {
      setError('Please enter a valid price');
      setHasClicked(false);
      return;
    }

    if (stock < 0) {
      setError('Please enter a valid stock quantity');
      setHasClicked(false);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ categoryId: category.id, name, description, price, imageUrl: '', stock }),
    });

    if (res.ok) {
      navigate('/admin/products');
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
    <div className='product-add-page'>
      <form className='product-add-form' onSubmit={addProduct}>
        <Heading title='New Product' />
        <FormSelect label='Category' categories={categories} category={category} setCategory={setCategory} />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormInput label='Price' type='number' value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
        <FormInput label='Stock' type='number' value={stock.toString()} onChange={(e) => setStock(Number(e.target.value))} />
        <FormButton usage='Add' error={error} hasClicked={hasClicked} />
        <PageLink path='./..' display='Product List' />
      </form>
    </div>
  );
}
