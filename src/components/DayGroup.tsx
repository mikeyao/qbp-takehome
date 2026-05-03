import './DayGroup.css'
import type { Transaction } from '../types'
import { TransactionRow } from './TransactionRow'
import { formatCurrency, formatDayHeading } from '../utils/format'

interface Props {
  date: string
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export function DayGroup({ date, transactions, onDelete }: Props) {
  // Net sum of the transactions in this group. When filtering is added, this
  // reflects the visible rows for the day, not the underlying total.
  const dayTotal = transactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <section className="day-group">
      <header className="day-header">
        <h2 className="day-heading">{formatDayHeading(date)}</h2>
        <span className="day-total">
          {dayTotal > 0 ? '+' : ''}
          {formatCurrency(Math.abs(dayTotal))}
        </span>
      </header>
      <ul className="transaction-list">
        {transactions.map((t) => (
          <TransactionRow key={t.id} transaction={t} onDelete={() => onDelete(t.id)} />
        ))}
      </ul>
    </section>
  )
}
