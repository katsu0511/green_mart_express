import './MainLayout.css';
import useModal from '@/lib/useModal';
import Header from '@/components/Organisms/Header/Header';
import Footer from '@/components/Organisms/Footer/Footer';
import ErrorModal from '@/components/Organisms/ErrorModal/ErrorModal';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { displayErrorModal } = useModal();

  return (
    <>
      <Header />
      <main className='main'>
        <div className='main-content'>{children}</div>
      </main>
      <Footer />
      { displayErrorModal && <ErrorModal /> }
    </>
  );
}
