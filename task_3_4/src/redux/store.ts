import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    chat: chatReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch