import type { Transaction } from '../types'
import { formatCurrency } from '../utils/format'

interface Props {
  transaction: Transaction
}

export function TransactionRow({ transaction }: Props) {
  const { merchant, category, amount } = transaction
  const isCredit = amount > 0
  const amountClass = isCredit ? 'amount-credit' : 'amount-debit'

  return (
    <li className="transaction-row">
      <div className="transaction-main">
        <span className="transaction-merchant">{merchant}</span>
        <span className="transaction-category">{category}</span>
      </div>
      <span className={`transaction-amount ${amountClass}`}>
        {isCredit ? '+' : ''}
        {formatCurrency(Math.abs(amount))}
      </span>
    </li>
  )
}
