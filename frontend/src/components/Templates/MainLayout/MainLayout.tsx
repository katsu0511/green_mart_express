import './MainLayout.css';
import Header from '@/components/Organisms/Header/Header';
import Footer from '@/components/Organisms/Footer/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='main'>
        <div className='main-content'>{children}</div>
      </main>
      <Footer />
    </>
  );
}
