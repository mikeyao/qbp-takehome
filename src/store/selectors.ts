import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'

export const selectFilteredTransactions = createSelector(
  (state: RootState) => state.transactions.items,
  (state: RootState) => state.filters.categories,
  (state: RootState) => state.filters.search,
  (items, categories, search) => {
    const byCategory =
      categories.length === 0 ? items : items.filter((t) => categories.includes(t.category))
    const q = search.trim().toLowerCase()
    return q === '' ? byCategory : byCategory.filter((t) => t.merchant.toLowerCase().includes(q))
  },
)
