import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/Templates/MainLayout/MainLayout';
import ProductList from '@/pages/ProductList/ProductList';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
