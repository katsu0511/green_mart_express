import './ProductDetailPage.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';
import useModal from '@/lib/useModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { setErrorMessage, setDisplayErrorModal } = useModal();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`);

      if (res.ok) {
        const item: Product = await res.json();
        setProduct(item);
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getProduct();
  }, [id, setErrorMessage, setDisplayErrorModal]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='product-detail'>
      <Link to='/' className='product-detail__back-link'>← Back to Products</Link>

      <div className='product-detail__content'>
        <div className='product-detail__image-wrapper'>
          <img src={product.imageUrl || '/no-image.png'} alt={product.name} className='product-detail__image' />
        </div>

        <div className='product-detail__info'>
          <p className='product-detail__category'>Category ID: {product.categoryId}</p>
          <h1 className='product-detail__name'>{product.name}</h1>
          <p className='product-detail__price'>¥{product.price}</p>
          <div className='product-detail__stock'>
            <span>{product.stock > 0 ? 'In Stock' : 'Sold Out'}</span>
          </div>
          <div className='product-detail__description'>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
