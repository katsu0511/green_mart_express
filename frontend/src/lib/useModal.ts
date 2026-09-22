import { useContext } from 'react';
import ModalContext from '@/lib/ModalContext';

export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProviderWrapper');
  }

  return context;
}
