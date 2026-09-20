import './ProductList.css';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const res = await fetch('http://localhost:3001/api/products');

    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
  }, []);

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
