import './AdminPage.css';
import { useState, useEffect } from 'react';
import type { OrderMonth } from '@/types/order.js';
import useModal from '@/lib/useModal';
import useForm from '@/lib/useForm';
import useAuth from '@/lib/useAuth';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AdminDashboard = {
  sales: number
  orders: number
  months: OrderMonth[]
};

const now = new Date();
const thisYear = now.getFullYear();
const thisMonth = now.getMonth() + 1;

export default function AdminPage() {
  const [salesAmount, setSalesAmount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [orderMonths, setOrderMonths] = useState<OrderMonth[]>([]);
  const { setErrorMessage, setDisplayErrorModal } = useModal();
  const { navigate } = useForm();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const getDashboard = async () => {
      const res = await fetch(`${API_BASE_URL}/api/admin`, {
        credentials: 'include',
      });

      if (res.ok) {
        const data: AdminDashboard = await res.json();
        setSalesAmount(data.sales);
        setOrderCount(data.orders);
        setOrderMonths(data.months);
      } else if (res.status === 401) {
        await refreshAuth();
        navigate('/login');
      } else {
        const data = await res.json();
        setErrorMessage(data.error);
        setDisplayErrorModal(true);
      }
    };

    getDashboard();
  }, [refreshAuth, navigate, setErrorMessage, setDisplayErrorModal]);

  return (
    <div className='admin-page'>
      <div className='admin-page__header'>
        <p className='admin-page__eyebrow'>Administration</p>
        <h1 className='admin-page__title'>Dashboard</h1>
      </div>

      <section className='admin-page__section'>
        <div className='admin-page__section-header'>
          <div>
            <p className='admin-page__section-eyebrow'>{`${thisYear}/${thisMonth}`}</p>
            <h2 className='admin-page__section-title'>Store Overview</h2>
          </div>
        </div>

        <div className='admin-page__stats'>
          <div className='admin-page__stat-card'>
            <div className='admin-page__stat-icon'>¥</div>
            <div>
              <p className='admin-page__stat-label'>Sales</p>
              <p className='admin-page__stat-value'>¥{salesAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className='admin-page__stat-card'>
            <div className='admin-page__stat-icon'>#</div>
            <div>
              <p className='admin-page__stat-label'>Orders</p>
              <p className='admin-page__stat-value'>{orderCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='admin-page__section'>
        <div className='admin-page__section-header'>
          <div>
            <p className='admin-page__section-eyebrow'>Order History</p>
            <h2 className='admin-page__section-title'>Browse by Month</h2>
          </div>
        </div>

        {orderMonths.length > 0 ? (
          <div className='admin-page__month-list'>
            {orderMonths.map(({ year, month }) => (
              <Link key={`${year}-${month}`} to={`/admin/orders?year=${year}&month=${month}`} className='admin-page__month-link'>
                <span>{year}/{month}</span>
                <span className='admin-page__month-arrow'>→</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className='admin-page__empty'>
            <p>No orders yet.</p>
          </div>
        )}
      </section>

      <section className='admin-page__section'>
        <div className='admin-page__section-header'>
          <div>
            <p className='admin-page__section-eyebrow'>Management</p>
            <h2 className='admin-page__section-title'>Manage Store</h2>
          </div>
        </div>

        <div className='admin-page__management-grid'>
          <Link to='/admin/products' className='admin-page__management-card'>
            <div className='admin-page__management-icon'>P</div>
            <div className='admin-page__management-content'>
              <h3>Products</h3>
              <p>Add, edit, and manage products and inventory.</p>
            </div>
            <span className='admin-page__management-arrow'>→</span>
          </Link>

          <Link to='/admin/orders' className='admin-page__management-card'>
            <div className='admin-page__management-icon'>O</div>
            <div className='admin-page__management-content'>
              <h3>Orders</h3>
              <p>View orders and manage order status.</p>
            </div>
            <span className='admin-page__management-arrow'>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
