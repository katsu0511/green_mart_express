import './ProductDetailPage.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ProductWithCategory } from '@/types/product';
import useModal from '@/lib/useModal';
import useAuth from '@/lib/useAuth';
import useForm from '@/lib/useForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { refreshAuth } = useAuth();
  const { navigate } = useForm();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`);

      if (res.ok) {
        const item: ProductWithCategory = await res.json();
        setProduct(item);
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getProduct();
  }, [id, setErrorMessage, setDisplayErrorModal]);

  const addToCart = async () => {
    if (!product) return;

    const res = await fetch(`${API_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ productId: product.id, quantity }),
    });

    if (res.ok) {
      navigate('/cart');
    } else if (res.status === 401) {
      await refreshAuth();
      navigate('/login');
    } else {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }
  };

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
          <p className='product-detail__category'>Category: {product.category.name}</p>
          <h2 className='product-detail__name'>{product.name}</h2>
          <p className='product-detail__price'>¥{product.price}</p>
          <div className='product-detail__stock'>
            <span>{product.stock > 0 ? 'In Stock' : 'Sold Out'}</span>
          </div>
          <div className='product-detail__description'>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          {
            product.stock > 0 &&
            <div className='product-detail__cart'>
              <h3 className='product-detail__cart-title'>Quantity</h3>
              <div className='product-detail__quantity'>
                <button
                  className='product-detail__quantity-button'
                  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)}
                  aria-label='Decrease quantity'
                >
                  -
                </button>
                <span className='product-detail__quantity-value'>{quantity}</span>
                <button
                  className='product-detail__quantity-button'
                  onClick={() => setQuantity(prev => prev < Math.min(10, product.stock) ? prev + 1 : prev)}
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>
              <button className='product-detail__add-cart' onClick={addToCart} >Add to cart</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
