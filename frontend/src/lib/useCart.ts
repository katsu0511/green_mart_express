import type { CartItemWithDetail } from '@/types/cartItem';
import type { NavigateFunction } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCartItems = async (
  setCartItems: (cartItems: CartItemWithDetail[]) => void,
  setErrorMessage: (error: string) => void,
  setDisplayErrorModal: (isDisplay: boolean) => void,
  refreshAuth: () => Promise<void>,
  navigate: NavigateFunction
) => {
  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    credentials: 'include',
  });

  if (res.ok) {
    const cartItemList: CartItemWithDetail[] = await res.json();
    setCartItems(cartItemList);
  } else if (res.status === 401) {
    await refreshAuth();
    navigate('/login');
  } else {
    const data = await res.json();
    setErrorMessage(data.error);
    setDisplayErrorModal(true);
  }
};

export const totalAmount = (cartItems: CartItemWithDetail[]) => cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);
