import { describe, it, expect } from 'vitest'
import reducer, { addTransaction, deleteTransaction } from './transactionsSlice'
import type { Transaction } from '../types'

const tx = (id: string, date = '2024-01-01'): Transaction => ({
  id,
  date,
  merchant: `Merchant ${id}`,
  category: 'Groceries',
  amount: -10,
})

describe('transactionsSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    expect(state.items.length).toBeGreaterThan(0)
  })

  it('addTransaction prepends to the list', () => {
    const initial = { items: [tx('b')] }
    const state = reducer(initial, addTransaction(tx('a')))
    expect(state.items[0]?.id).toBe('a')
    expect(state.items[1]?.id).toBe('b')
  })

  it('deleteTransaction removes the matching item', () => {
    const initial = { items: [tx('a'), tx('b'), tx('c')] }
    const state = reducer(initial, deleteTransaction('b'))
    expect(state.items.map((t) => t.id)).toEqual(['a', 'c'])
  })

  it('deleteTransaction is a no-op for unknown id', () => {
    const initial = { items: [tx('a')] }
    const state = reducer(initial, deleteTransaction('unknown'))
    expect(state.items).toHaveLength(1)
  })
})
