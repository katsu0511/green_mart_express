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
import RequireAuth from '@/components/Templates/RequireAuth/RequireAuth';
import CartPage from'@/pages/CartPage/CartPage';
import CheckoutPage from '@/pages/CheckoutPage/CheckoutPage';

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

                <Route element={<RequireAuth />}>
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                </Route>

              </Routes>
            </MainLayout>
          </ThemeProviderWrapper>
        </ModalProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  );
}
