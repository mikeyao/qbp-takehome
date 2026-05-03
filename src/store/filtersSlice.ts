import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionCategory } from '../types'

interface FiltersState {
  categories: TransactionCategory[]
  search: string
}

const initialState: FiltersState = {
  categories: [],
  search: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<TransactionCategory[]>) {
      state.categories = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    clearFilters(state) {
      state.categories = []
      state.search = ''
    },
  },
})

export const { setCategories, setSearch, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
