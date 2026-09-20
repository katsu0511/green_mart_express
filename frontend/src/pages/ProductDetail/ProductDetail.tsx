import './ProductDetail.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '@/types/product';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3001/api/products/${id}`);

      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    };

    getProduct();
  }, [id]);

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
