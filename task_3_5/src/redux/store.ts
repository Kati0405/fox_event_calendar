import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { CartState } from './slices/cartSlice'
import contactReducer from './slices/contactInfoSlice'
import shipmentReducer from './slices/shipmentInfoSlice'

import { saveState, loadState } from 'src/utils/localStorage'

const initialCartState: CartState = loadState('cart') || {
    cartItems: [],
    quantity: 0,
    total: 0,
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        contact: contactReducer,
        shipment: shipmentReducer,
    },
    preloadedState: {
        cart: initialCartState,
    },
})

store.subscribe(() => {
    saveState('cart', store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch