import { describe, it, expect } from 'vitest'
import { selectFilteredTransactions } from './selectors'
import type { RootState } from './store'
import type { Transaction } from '../types'

const tx = (id: string, merchant: string, category: Transaction['category']): Transaction => ({
  id,
  date: '2024-01-01',
  merchant,
  category,
  amount: -10,
})

function makeState(
  items: Transaction[],
  categories: Transaction['category'][] = [],
  search = '',
): RootState {
  return {
    transactions: { items },
    filters: { categories, search },
  }
}

const items: Transaction[] = [
  tx('1', 'Whole Foods', 'Groceries'),
  tx('2', 'Shell', 'Gas'),
  tx('3', 'Amazon', 'Shopping'),
]

describe('selectFilteredTransactions', () => {
  it('returns all items when no filters are active', () => {
    expect(selectFilteredTransactions(makeState(items))).toHaveLength(3)
  })

  it('filters by a single category', () => {
    const result = selectFilteredTransactions(makeState(items, ['Groceries']))
    expect(result).toHaveLength(1)
    expect(result[0]?.merchant).toBe('Whole Foods')
  })

  it('filters by multiple categories', () => {
    const result = selectFilteredTransactions(makeState(items, ['Groceries', 'Gas']))
    expect(result).toHaveLength(2)
  })

  it('filters by search (case-insensitive)', () => {
    const result = selectFilteredTransactions(makeState(items, [], 'amazon'))
    expect(result).toHaveLength(1)
    expect(result[0]?.merchant).toBe('Amazon')
  })

  it('composes category filter and search', () => {
    const result = selectFilteredTransactions(makeState(items, ['Groceries'], 'whole'))
    expect(result).toHaveLength(1)
    expect(result[0]?.merchant).toBe('Whole Foods')
  })

  it('returns empty when search matches nothing', () => {
    const result = selectFilteredTransactions(makeState(items, [], 'zzz'))
    expect(result).toHaveLength(0)
  })

  it('returns empty when category and search have no overlap', () => {
    const result = selectFilteredTransactions(makeState(items, ['Gas'], 'whole'))
    expect(result).toHaveLength(0)
  })
})
