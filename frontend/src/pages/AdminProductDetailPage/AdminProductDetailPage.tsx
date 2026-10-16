import './AdminProductDetailPage.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ProductWithCategory } from '@/types/product';
import useModal from '@/lib/useModal';
import useAuth from '@/lib/useAuth';
import useForm from '@/lib/useForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [stockToAdd, setStockToAdd] = useState<number>(1);
  const [isAddingStock, setIsAddingStock] = useState(false);
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

  const addStock = async (productId: number) => {
    if (stockToAdd < 1 || !Number.isInteger(stockToAdd)) return;
    setIsAddingStock(true);

    const res = await fetch(`${API_BASE_URL}/api/admin/products/${productId}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ quantity: stockToAdd }),
    });

    if (res.ok) {
      const item: ProductWithCategory = await res.json();
      setProduct(item);
    } else if (res.status === 401) {
      await refreshAuth();
      navigate('/login');
    } else {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }

    setIsAddingStock(false);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='admin-product-detail'>
      <Link to='/admin/products' className='admin-product-detail__back-link'>
        <span aria-hidden='true'>←</span>
        Back to Products
      </Link>

      <div className='admin-product-detail__content'>
        <div className='admin-product-detail__image-wrapper'>
          <img src={product.imageUrl || '/no-image.png'} alt={product.name} className='admin-product-detail__image' />
        </div>

        <div className='admin-product-detail__info'>
          <p className='admin-product-detail__category'>{product.category.name}</p>
          <h3 className='admin-product-detail__name'>{product.name}</h3>
          <p className='admin-product-detail__price'>¥{product.price.toLocaleString()}</p>

          <section className='admin-product-detail__stock'>
            <div className='admin-product-detail__stock-current'>
              <span className='admin-product-detail__stock-label'>Current Stock</span>
              <strong className='admin-product-detail__stock-value'>
                {product.stock.toLocaleString()}
                <span> units</span>
              </strong>
            </div>

            <div className='admin-product-detail__stock-form'>
              <label htmlFor='stock-to-add' className='admin-product-detail__input-label'>Quantity to add</label>
              <input
                id='stock-to-add'
                type='number'
                min='1'
                step='1'
                value={stockToAdd}
                onChange={(e) => setStockToAdd(e.target.value === '' ? 0 : Number(e.target.value))}
                className='admin-product-detail__stock-input'
              />
              <button
                type='button'
                className='admin-product-detail__stock-button'
                onClick={() => addStock(product.id)}
                disabled={isAddingStock || stockToAdd < 1 || !Number.isInteger(stockToAdd)}
              >
                {isAddingStock ? 'Adding...' : 'Add Stock'}
              </button>
            </div>
          </section>

          <section className='admin-product-detail__description'>
            <h3 className='admin-product-detail__section-title'>Description</h3>
            <p>{product.description}</p>
          </section>

          <div className='admin-product-detail__actions'>
            <Link to={`/admin/products/${product.id}/edit`} className='admin-product-detail__edit'>Edit Product</Link>
            <button type='button' className='admin-product-detail__delete'>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
