import './CartPage.css';
import { useState, useEffect } from 'react';
import type { CartItemWithDetail } from '@/types/cartItem';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import Heading from '@/components/Atoms/Heading/Heading';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithDetail[]>([]);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { navigate } = useForm();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const getCartItems = async () => {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        credentials: 'include',
      });

      if (res.ok) {
        const cartItemList: CartItemWithDetail[] = await res.json();
        setCartItems(cartItemList);
      } else if (res.status === 401) {
        await refreshAuth();
        navigate('/login');
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getCartItems();
  }, [refreshAuth, navigate, setErrorMessage, setDisplayErrorModal]);

  const deleteCartItem = async (productId: number) => {
    const res = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setCartItems(prev => prev.filter(cartItem => cartItem.product.id !== productId));
    } else if (res.status === 401) {
      await refreshAuth();
      navigate('/login');
    } else {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }
  };

  const totalAmount = cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div className='cart-page'>
      <div className='cart-header'>
        <Heading title='Shopping Cart' />
      </div>

      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <div className='empty-cart-icon'>🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart and they will appear here.</p>
          <button className='continue-shopping-button' onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <div className='cart-content'>
          <section className='cart-items'>
            <div className='cart-items-header'>
              <span>Product</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            {cartItems.map(cartItem => {
              const { product, quantity } = cartItem;
              const subtotal = product.price * quantity;

              return (
                <div className='cart-item' key={product.id}>
                  <div className='product-info'>
                    <Link to={`/products/${product.id}`} className='product-link'>
                      <div className='product-content'>
                        <img className='product-image' src={product.imageUrl || '/no-image.png'} alt={product.name} />
                        <div className='product-details'>
                          <h3>{product.name}</h3>
                          <p className='product-price'>¥{formatPrice(product.price)}</p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className='quantity'>
                    <span>{quantity}</span>
                  </div>

                  <div className='subtotal'>¥{formatPrice(subtotal)}</div>

                  <div className='delete'>
                    <button className='delete-cart-button' onClick={() => deleteCartItem(product.id)} aria-label={`Remove ${product.name} from cart`}>
                      <img src='/delete.png' alt='delete' />
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          <aside className='cart-summary'>
            <h3>Order Summary</h3>

            <div className='summary-row'>
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className='summary-divider' />

            <div className='summary-total'>
              <span>Total</span>
              <strong>¥{formatPrice(totalAmount)}</strong>
            </div>

            <button className='checkout-button'>Proceed to Checkout</button>

            <button className='continue-shopping-button secondary' onClick={() => navigate('/')}>Continue Shopping</button>
          </aside>
        </div>
      )}
    </div>
  );
}
