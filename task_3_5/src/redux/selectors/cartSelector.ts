import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectCartQuantity = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);
