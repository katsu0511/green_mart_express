import './AdminProductEditPage.css';
import { useState, useEffect } from 'react';
import type { Category } from '@/types/category';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { useParams } from 'react-router-dom';
import type { ProductWithCategory } from '@/types/product';
import Heading from '@/components/Atoms/Heading/Heading';
import FormSelect from '@/components/Modules/FormSelect/FormSelect';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminProductEditPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { error, setError, navigate } = useForm();
  const { refreshAuth } = useAuth();
  const { id } = useParams();
  const productId = Number(id);

  useEffect(() => {
    const getProductAndCategories = async () => {
      const [productRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/products/${productId}`),
        fetch(`${API_BASE_URL}/api/categories`),
      ]);

      if (!productRes.ok || !categoriesRes.ok) {
        const data = !productRes.ok ? await productRes.json() : await categoriesRes.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      } else {
        const productData: ProductWithCategory = await productRes.json();
        const categoryData: Category[] = await categoriesRes.json();
        setCategories(categoryData);
        setCategory(productData.category);
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
      }
    };

    getProductAndCategories();
  }, [productId, setErrorMessage, setDisplayErrorModal]);

  const updateProduct = async(e: React.SubmitEvent<HTMLFormElement>) => {
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

    const res = await fetch(`${API_BASE_URL}/api/admin/products/${productId}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ categoryId: category.id, name, description, price, imageUrl: '' }),
    });

    if (res.ok) {
      navigate(`/admin/products/${productId}`);
    } else if (res.status === 401) {
      await refreshAuth();
      navigate('/login');
    } else {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }
  };

  if (!Number.isInteger(productId) || productId <= 0) {
    setErrorMessage('Invalid Product ID');
    setDisplayErrorModal(true);
  }

  return (
    <div className='product-edit-page'>
      <form className='product-edit-form' onSubmit={updateProduct}>
        <Heading title='Edit Product' />
        <FormSelect label='Category' categories={categories} category={category} setCategory={setCategory} />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormInput label='Price' type='number' value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
        <FormButton usage='Update' error={error} hasClicked={hasClicked} />
        <PageLink path='./..' display='Product Detail' />
      </form>
    </div>
  );
}
