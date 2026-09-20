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
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>¥{product.price}</p>
          <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
