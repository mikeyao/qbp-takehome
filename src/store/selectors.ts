import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'

export const selectFilteredTransactions = createSelector(
  (state: RootState) => state.transactions.items,
  (state: RootState) => state.filters.categories,
  (items, categories) =>
    categories.length === 0 ? items : items.filter((t) => categories.includes(t.category)),
)
