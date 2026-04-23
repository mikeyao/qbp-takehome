import type { Transaction } from '../types'

export interface DayBucket {
  date: string
  transactions: Transaction[]
}

// Cheap enough to call on every render — do not store the result in state.
export function groupByDay(transactions: readonly Transaction[]): DayBucket[] {
  const groups = new Map<string, Transaction[]>()
  for (const transaction of transactions) {
    const bucket = groups.get(transaction.date) ?? []
    bucket.push(transaction)
    groups.set(transaction.date, bucket)
  }
  return Array.from(groups, ([date, items]) => ({ date, transactions: items })).sort((a, b) =>
    b.date.localeCompare(a.date),
  )
}
