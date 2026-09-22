import { useState } from 'react';
import ModalContext from '@/lib/ModalContext';

export default function ModalProviderWrapper({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [displayErrorModal, setDisplayErrorModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ errorMessage, setErrorMessage, displayErrorModal, setDisplayErrorModal }}>
      {children}
    </ModalContext.Provider>
  );
}
