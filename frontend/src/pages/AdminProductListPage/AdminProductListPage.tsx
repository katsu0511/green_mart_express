import './AdminProductListPage.css';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';
import useModal from '@/lib/useModal';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { setErrorMessage, setDisplayErrorModal } = useModal();

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${API_BASE_URL}/api/products`);

      if (res.ok) {
        const productList: Product[] = await res.json();
        setProducts(productList);
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getProducts();
  }, [setErrorMessage, setDisplayErrorModal]);

  return (
    <div className='admin-product-list'>
      <div className='admin-product-list__header'>
        <div>
          <p className='admin-product-list__eyebrow'>Management</p>
          <h1 className='admin-product-list__title'>Products</h1>
          <p className='admin-product-list__description'>Manage your products and inventory.</p>
        </div>
        <Link to='/admin/products/new' className='admin-product-list__add'>+ Add Product</Link>
      </div>

      <div className='admin-product-list__items'>
        {products.map((product) => (
          <div key={product.id} className='admin-product-list__card'>
            <Link to={`/admin/products/${product.id}`} className='admin-product-list__link'>
              <div className='admin-product-list__image-wrapper'>
                <img src={product.imageUrl || '/no-image.png'} alt={product.name} className='admin-product-list__image' />
              </div>
              <div className='admin-product-list__info'>
                <h2 className='admin-product-list__name'>{product.name}</h2>
                <p className='admin-product-list__price'>¥{product.price.toLocaleString()}</p>
              </div>
            </Link>

            <div className='admin-product-list__actions'>
              <Link to={`/admin/products/${product.id}/edit`} className='admin-product-list__edit'>Edit</Link>
              <button type='button' className='admin-product-list__delete'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
