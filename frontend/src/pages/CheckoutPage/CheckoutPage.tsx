import './CheckoutPage.css';
import { useState, useEffect } from 'react';
import type { CartItemWithDetail } from '@/types/cartItem';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { getCartItems, totalAmount, formatPrice } from '@/lib/useCart';
import type { OrderItemInfo } from '@/types/orderItem';
import Heading from '@/components/Atoms/Heading/Heading';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItemWithDetail[]>([]);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { navigate } = useForm();
  const { refreshAuth, user } = useAuth();

  useEffect(() => {
    getCartItems(setCartItems, setErrorMessage, setDisplayErrorModal, refreshAuth, navigate);
  }, [setErrorMessage, setDisplayErrorModal, refreshAuth, navigate]);

  const preCheck = () => {
    if (confirm('Are you sure to checkout?')) {
			checkout();
		}
  };

  const checkout = async () => {
    if (!user) {
      redirectToLoginPage();
      return;
    }

    const orderItems: OrderItemInfo[] = cartItems.map(cartItem => ({ productId: cartItem.product.id, quantity: cartItem.quantity }));

    const res = await fetch(`${API_BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ shippingAddress: user.address, orderItems }),
    });

    if (res.ok) {
      navigate('/order');
    } else if (res.status === 401) {
      redirectToLoginPage();
    } else {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }
  };

  const redirectToLoginPage = async () => {
    await refreshAuth();
    navigate('/login');
  };

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <Heading title='Confirmation' />
      </div>

      <div className='checkout-content'>
        <section className='checkout-items'>

          {cartItems.map(cartItem => {
            const { product, quantity } = cartItem;
            const subtotal = product.price * quantity;

            return (
              <div className='checkout-item' key={product.id}>
                <div className='checkout-product-info'>
                  <img className='checkout-product-image' src={product.imageUrl || '/no-image.png'} alt={product.name} />

                  <div className='checkout-product-details'>
                    <h4>{product.name}</h4>
                    <p className='checkout-product-price'>¥{formatPrice(product.price)}</p>
                  </div>
                </div>

                <div className='checkout-quantity'>
                  <span className='checkout-quantity-label'>Quantity</span>
                  <span className='checkout-quantity-value'>{quantity}</span>
                </div>

                <div className='checkout-subtotal'>
                  <span className='checkout-subtotal-label'>Subtotal</span>
                  <span className='checkout-subtotal-value'>¥{formatPrice(subtotal)}</span>
                </div>
              </div>
            );
          })}
        </section>

        <aside className='checkout-summary'>
          <h3>Order Summary</h3>

          <div className='summary-row'>
            <span>Subtotal</span>
            <span>¥{formatPrice(totalAmount(cartItems))}</span>
          </div>

          <div className='summary-row'>
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className='summary-divider' />

          <div className='summary-total'>
            <span>Total</span>
            <strong>¥{formatPrice(totalAmount(cartItems))}</strong>
          </div>

          <div className='shipping-address'>
            <strong>Shipping Address</strong>
            <span>{user?.address}</span>
          </div>

          <button className='checkout-button' onClick={preCheck}>Checkout</button>

          <Link className='back-to-cart-button' to='/cart'>Back to Cart</Link>
        </aside>
      </div>
    </div>
  );
}
