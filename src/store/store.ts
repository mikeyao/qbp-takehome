import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './transactionsSlice'
import filtersReducer from './filtersSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
