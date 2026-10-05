import './OrderListPage.css';
import { useState, useEffect } from 'react';
import type { Order } from '@/types/order';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { Link } from 'react-router-dom';
import { formatDate, formatPrice } from '@/lib/useFormat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { navigate } = useForm();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        credentials: 'include',
      });

      if (res.ok) {
        const orderList: Order[] = await res.json();
        setOrders(orderList);
      } else if (res.status === 401) {
        await refreshAuth();
        navigate('/login');
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getOrders();
  }, [refreshAuth, navigate, setErrorMessage, setDisplayErrorModal]);

  return (
    <div className='order-list'>
      <div className='order-list__header'>
        <h1 className='order-list__title'>Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className='order-list__empty'>
          <h2>No orders yet</h2>
          <p>Your order history will appear here.</p>
          <Link to='/' className='order-list__shop-button'>Continue Shopping</Link>
        </div>
      ) : (
        <div className='order-list__grid'>
          {orders.map((order) => (
            <Link key={order.id} to={`/orders/${order.id}`} className='order-list__card'>
              <div className='order-list__card-header'>
                <div>
                  <p className='order-list__label'>Order</p>
                  <h2 className='order-list__number'>#{order.id}</h2>
                </div>
                <span className={`order-list__status order-list__status--${order.status.toLowerCase()}`}>{order.status}</span>
              </div>

              <div className='order-list__card-body'>
                <div className='order-list__detail'>
                  <span className='order-list__label'>Order date</span>
                  <span className='order-list__value'>{formatDate(order.createdAt)}</span>
                </div>
                <div className='order-list__detail'>
                  <span className='order-list__label'>Total</span>
                  <span className='order-list__total'>¥{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
