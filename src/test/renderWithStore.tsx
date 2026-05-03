import { type ReactElement } from 'react'
import { render, type RenderResult } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import transactionsReducer from '../store/transactionsSlice'
import filtersReducer from '../store/filtersSlice'
import type { RootState } from '../store/store'

export function renderWithStore(
  ui: ReactElement,
  preloadedState?: Partial<RootState>,
): RenderResult {
  const store = configureStore({
    reducer: { transactions: transactionsReducer, filters: filtersReducer },
    preloadedState,
  })
  return render(<Provider store={store}>{ui}</Provider>)
}
