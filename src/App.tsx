import { useState } from 'react'
import { AddTransactionForm } from './components/AddTransactionForm'
import { DayGroup } from './components/DayGroup'
import { useAppSelector } from './store/hooks'
import { groupByDay } from './utils/transactions'

export default function App() {
  const transactions = useAppSelector((state) => state.transactions.items)
  const grouped = groupByDay(transactions)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-row">
          <div>
            <h1>Transactions</h1>
            <p className="subtitle">Last 7 days</p>
          </div>
          <button
            className="btn btn--primary"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
          >
            {showForm ? 'Cancel' : '+ Add'}
          </button>
        </div>
        {showForm && <AddTransactionForm onClose={() => setShowForm(false)} />}
      </header>
      <main className="app-main">
        {grouped.map(({ date, transactions: dayTransactions }) => (
          <DayGroup key={date} date={date} transactions={dayTransactions} />
        ))}
      </main>
    </div>
  )
}
