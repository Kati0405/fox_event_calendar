import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  cartItems: CartItem[];
  quantity: number;
  total: number;
}

interface CartItem {
  image: string;
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const initialState: CartState = {
  cartItems: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }
    },
    calculateTotals: (state) => {
      let quantity = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.quantity = quantity;
      state.total = total;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  calculateTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
