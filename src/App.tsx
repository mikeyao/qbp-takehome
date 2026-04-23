import { DayGroup } from './components/DayGroup'
import { transactions } from './data/transactions'
import { groupByDay } from './utils/transactions'

export default function App() {
  const grouped = groupByDay(transactions)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transactions</h1>
        <p className="subtitle">Last 7 days</p>
      </header>
      <main className="app-main">
        {grouped.map(({ date, transactions: dayTransactions }) => (
          <DayGroup key={date} date={date} transactions={dayTransactions} />
        ))}
      </main>
    </div>
  )
}
