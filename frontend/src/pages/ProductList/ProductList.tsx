import './ProductList.css';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';
import useModal from '@/lib/useModal';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductList() {
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
    <div className='product-list'>
      <h1 className='product-list__title'>Products</h1>
      <div className='product-list__grid'>
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className='product-list__card'>
            <div className='product-list__image-wrapper'>
              <img src={product.imageUrl || '/no-image.png'} alt={product.name} className='product-list__image' />
            </div>
            <div className='product-list__info'>
              <h2 className='product-list__name'>{product.name}</h2>
              <p className='product-list__price'>¥{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
