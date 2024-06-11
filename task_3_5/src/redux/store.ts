import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import contactReducer from './slices/contactInfoSlice'
import shipmentReducer from './slices/shipmentInfoSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        contact: contactReducer,
        shipment: shipmentReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch