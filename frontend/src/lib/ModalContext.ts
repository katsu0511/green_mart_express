import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

type ModalContext = {
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
  displayErrorModal: boolean
  setDisplayErrorModal: Dispatch<SetStateAction<boolean>>
};

const ModalContext = createContext<ModalContext | undefined>(undefined);

export default ModalContext;
