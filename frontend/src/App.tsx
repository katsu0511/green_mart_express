import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModalProviderWrapper from '@/components/Templates/ModalProviderWrapper/ModalProviderWrapper';
import MainLayout from '@/components/Templates/MainLayout/MainLayout';
import ProductList from '@/pages/ProductList/ProductList';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';

export default function App() {
  return (
    <BrowserRouter>
      <ModalProviderWrapper>
        <MainLayout>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/products/:id' element={<ProductDetail />} />
          </Routes>
        </MainLayout>
      </ModalProviderWrapper>
    </BrowserRouter>
  );
}
