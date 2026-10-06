import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProviderWrapper from '@/components/Templates/AuthProviderWrapper/AuthProviderWrapper';
import ModalProviderWrapper from '@/components/Templates/ModalProviderWrapper/ModalProviderWrapper';
import ThemeProviderWrapper from '@/components/Templates/ThemeProviderWrapper/ThemeProviderWrapper';
import MainLayout from '@/components/Templates/MainLayout/MainLayout';
import ProductListPage from '@/pages/ProductListPage/ProductListPage';
import ProductDetailPage from '@/pages/ProductDetailPage/ProductDetailPage';
import RequireUnauth from '@/components/Templates/RequireUnauth/RequireUnauth';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import RequireCustomerAuth from '@/components/Templates/RequireCustomerAuth/RequireCustomerAuth';
import CartPage from'@/pages/CartPage/CartPage';
import CheckoutPage from '@/pages/CheckoutPage/CheckoutPage';
import OrderListPage from '@/pages/OrderListPage/OrderListPage';
import OrderDetailPage from '@/pages/OrderDetailPage/OrderDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProviderWrapper>
        <ModalProviderWrapper>
          <ThemeProviderWrapper>
            <MainLayout>
              <Routes>

                <Route path='/' element={<ProductListPage />} />
                <Route path='/products/:id' element={<ProductDetailPage />} />

                <Route element={<RequireUnauth />}>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignupPage />} />
                </Route>

                <Route element={<RequireCustomerAuth />}>
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                  <Route path='/orders' element={<OrderListPage />} />
                  <Route path='/orders/:id' element={<OrderDetailPage />} />
                </Route>

              </Routes>
            </MainLayout>
          </ThemeProviderWrapper>
        </ModalProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  );
}
