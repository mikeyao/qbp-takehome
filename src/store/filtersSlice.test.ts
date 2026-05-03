import { describe, it, expect } from 'vitest'
import reducer, { setCategories, setSearch, clearFilters } from './filtersSlice'

describe('filtersSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ categories: [], search: '' })
  })

  it('setCategories updates selected categories', () => {
    const state = reducer(undefined, setCategories(['Groceries', 'Gas']))
    expect(state.categories).toEqual(['Groceries', 'Gas'])
  })

  it('setSearch updates search string', () => {
    const state = reducer(undefined, setSearch('amazon'))
    expect(state.search).toBe('amazon')
  })

  it('clearFilters resets everything', () => {
    const withFilters = { categories: ['Groceries'] as const, search: 'test' }
    const state = reducer({ categories: ['Groceries'], search: 'test' }, clearFilters())
    expect(state).toEqual({ categories: [], search: '' })
    // suppress unused var warning
    void withFilters
  })
})
