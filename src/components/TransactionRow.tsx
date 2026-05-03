import { useState } from 'react'
import './TransactionRow.css'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils/format'

interface Props {
  transaction: Transaction
  onDelete: () => void
}

export function TransactionRow({ transaction, onDelete }: Props) {
  const { merchant, category, amount } = transaction
  const isCredit = amount > 0
  const amountClass = isCredit ? 'amount-credit' : 'amount-debit'
  const [confirming, setConfirming] = useState(false)

  return (
    <li className="transaction-row">
      <div className="transaction-main">
        <span className="transaction-merchant">{merchant}</span>
        <span className="transaction-category">{category}</span>
      </div>
      <div className="transaction-right">
        <span className={`transaction-amount ${amountClass}`}>
          {isCredit ? '+' : ''}
          {formatCurrency(Math.abs(amount))}
        </span>
        {confirming ? (
          <div className="delete-confirm">
            <span className="delete-confirm-label">Delete?</span>
            <button className="delete-confirm-btn delete-confirm-btn--yes" onClick={onDelete}>
              Yes
            </button>
            <button
              className="delete-confirm-btn delete-confirm-btn--no"
              onClick={() => setConfirming(false)}
            >
              No
            </button>
          </div>
        ) : (
          <button
            className="delete-btn"
            aria-label={`Delete ${merchant}`}
            onClick={() => setConfirming(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        )}
      </div>
    </li>
  )
}
