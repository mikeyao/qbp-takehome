import { describe, it, expect } from 'vitest'
import { groupByDay } from './transactions'
import type { Transaction } from '../types'

const tx = (id: string, date: string): Transaction => ({
  id,
  date,
  merchant: 'Test',
  category: 'Groceries',
  amount: -10,
})

describe('groupByDay', () => {
  it('groups transactions by date', () => {
    const result = groupByDay([tx('a', '2024-01-02'), tx('b', '2024-01-01'), tx('c', '2024-01-02')])
    expect(result).toHaveLength(2)
    const jan2 = result.find((g) => g.date === '2024-01-02')
    expect(jan2?.transactions).toHaveLength(2)
  })

  it('sorts groups newest first', () => {
    const result = groupByDay([tx('a', '2024-01-01'), tx('b', '2024-01-03'), tx('c', '2024-01-02')])
    expect(result.map((g) => g.date)).toEqual(['2024-01-03', '2024-01-02', '2024-01-01'])
  })

  it('returns empty array for empty input', () => {
    expect(groupByDay([])).toEqual([])
  })

  it('handles a single transaction', () => {
    const result = groupByDay([tx('a', '2024-01-01')])
    expect(result).toHaveLength(1)
    expect(result[0]?.transactions).toHaveLength(1)
  })
})
