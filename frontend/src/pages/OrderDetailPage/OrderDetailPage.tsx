import './OrderDetailPage.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { OrderWithOrderItem } from '@/types/order';
import useModal from '@/lib/useModal';
import useAuth from '@/lib/useAuth';
import useForm from '@/lib/useForm';
import { formatPrice, formatDate } from '@/lib/useFormat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderWithOrderItem | null>(null);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { refreshAuth } = useAuth();
  const { navigate } = useForm();

  useEffect(() => {
    const getOrder = async () => {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        credentials: 'include',
      });

      if (res.ok) {
        const orderInfo: OrderWithOrderItem = await res.json();
        setOrder(orderInfo);
      } else if (res.status === 401) {
        await refreshAuth();
        navigate('/login');
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getOrder();
  }, [id, refreshAuth, navigate, setErrorMessage, setDisplayErrorModal]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className='order-detail'>
      <Link to='/orders' className='order-detail__back'>← Back to Orders</Link>

      <div className='order-detail__header'>
        <div>
          <p className='order-detail__label'>Order</p>
          <h1 className='order-detail__title'>#{order.id}</h1>
        </div>
        <span className={`order-detail__status order-detail__status--${order.status.toLowerCase()}`}>{order.status}</span>
      </div>

      <div className='order-detail__content'>
        <section className='order-detail__items'>
          <div className='order-detail__section-header'>
            <h2>Order Items</h2>
            <span>{order.items.length} item{order.items.length > 1 && 's'}</span>
          </div>

          <div className='order-detail__item-list'>
            {order.items.map((item) => {
              const subtotal = item.price * item.quantity;

              return (
                <div className='order-detail__item' key={item.productId}>
                  <div className='order-detail__item-info'>
                    <h3>{item.name}</h3>
                    <p>¥{formatPrice(item.price)}<span> × {item.quantity}</span></p>
                  </div>
                  <p className='order-detail__item-total'>¥{formatPrice(subtotal)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <aside className='order-detail__summary'>
          <h2>Order Summary</h2>

          <div className='order-detail__summary-row'>
            <span>Order date</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>

          <div className='order-detail__summary-row'>
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className='order-detail__divider' />

          <div className='order-detail__summary-total'>
            <span>Total</span>
            <strong>¥{formatPrice(order.totalAmount)}</strong>
          </div>
        </aside>
      </div>

      <section className='order-detail__shipping'>
        <h2>Shipping Address</h2>
        <p>{order.shippingAddress}</p>
      </section>
    </div>
  );
}
