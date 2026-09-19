import '@/App.css';
import { useState, useEffect } from 'react';
import heroImg from '@/assets/hero.png';
import reactLogo from '@/assets/react.svg';
import viteLogo from '@/assets/vite.svg';

type Product = {
  id: number
  categoryId: number
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  createdAt: string
  updatedAt: string
};

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('not ok');
  const [products, setProducts] = useState([]);

  const getStatus = async () => {
    const res = await fetch('http://localhost:3001/api/health');

    if (res.ok) {
      const data = await res.json();
      setStatus(data.status);
    } else {
      console.error('Could not get status');
    }
  };

  const getProducts = async () => {
    const res = await fetch('http://localhost:3001/api/products');

    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    } else {
      console.error('Could not get products');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getStatus();
    getProducts();
  }, []);

  return (
    <>
      <section id='center'>
        <div className='hero'>
          <img src={heroImg} className='base' width='170' height='179' alt='' />
          <img src={reactLogo} className='framework' alt='React logo' />
          <img src={viteLogo} className='vite' alt='Vite logo' />
        </div>
        <div>
          <h1>Status: {status}</h1>
          {products.map((product: Product) => (
            <div key={product.id}>
              <h2>Name: {product.name}</h2>
              <p>ID: {product.id}</p>
              <p>Category ID: {product.categoryId}</p>
              <p>Description: {product.description}</p>
              <p>¥{product.price}</p>
              <p>Image URL: {product.imageUrl}</p>
              <p>Stock: {product.stock}</p>
              <p>createdAt: {product.createdAt}</p>
              <p>updatedAt: {product.updatedAt}</p>
            </div>
          ))}
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type='button'
          className='counter'
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className='ticks'></div>

      <section id='next-steps'>
        <div id='docs'>
          <svg className='icon' role='presentation' aria-hidden='true'>
            <use href='/icons.svg#documentation-icon'></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href='https://vite.dev/' target='_blank'>
                <img className='logo' src={viteLogo} alt='' />
                Explore Vite
              </a>
            </li>
            <li>
              <a href='https://react.dev/' target='_blank'>
                <img className='button-icon' src={reactLogo} alt='' />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id='social'>
          <svg className='icon' role='presentation' aria-hidden='true'>
            <use href='/icons.svg#social-icon'></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href='https://github.com/vitejs/vite' target='_blank'>
                <svg
                  className='button-icon'
                  role='presentation'
                  aria-hidden='true'
                >
                  <use href='/icons.svg#github-icon'></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href='https://chat.vite.dev/' target='_blank'>
                <svg
                  className='button-icon'
                  role='presentation'
                  aria-hidden='true'
                >
                  <use href='/icons.svg#discord-icon'></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href='https://x.com/vite_js' target='_blank'>
                <svg
                  className='button-icon'
                  role='presentation'
                  aria-hidden='true'
                >
                  <use href='/icons.svg#x-icon'></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href='https://bsky.app/profile/vite.dev' target='_blank'>
                <svg
                  className='button-icon'
                  role='presentation'
                  aria-hidden='true'
                >
                  <use href='/icons.svg#bluesky-icon'></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className='ticks'></div>
      <section id='spacer'></section>
    </>
  )
}

export default App
