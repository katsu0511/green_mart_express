import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModalProviderWrapper from '@/components/Templates/ModalProviderWrapper/ModalProviderWrapper';
import ThemeProviderWrapper from '@/components/Templates/ThemeProviderWrapper/ThemeProviderWrapper';
import MainLayout from '@/components/Templates/MainLayout/MainLayout';
import ProductList from '@/pages/ProductList/ProductList';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';

export default function App() {
  return (
    <BrowserRouter>
      <ModalProviderWrapper>
        <ThemeProviderWrapper>
          <MainLayout>
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/products/:id' element={<ProductDetail />} />
            </Routes>
          </MainLayout>
        </ThemeProviderWrapper>
      </ModalProviderWrapper>
    </BrowserRouter>
  );
}
