import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { addTransaction } from '../store/transactionsSlice'
import { TRANSACTION_CATEGORIES, type TransactionCategory } from '../types'

interface FormFields {
  merchant: string
  category: TransactionCategory
  amount: string
  date: string
  isDebit: boolean
}

interface FormErrors {
  merchant?: string
  amount?: string
  date?: string
}

function todayIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const DEFAULT_CATEGORY = TRANSACTION_CATEGORIES[0] ?? 'Food & Drink'

const INITIAL_FIELDS: FormFields = {
  merchant: '',
  category: DEFAULT_CATEGORY,
  amount: '',
  date: todayIso(),
  isDebit: true,
}

interface Props {
  onClose: () => void
}

export function AddTransactionForm({ onClose }: Props) {
  const dispatch = useAppDispatch()
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS)
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!fields.merchant.trim()) errs.merchant = 'Merchant is required'
    const parsed = parseFloat(fields.amount)
    if (!fields.amount || isNaN(parsed) || parsed <= 0) errs.amount = 'Enter a positive amount'
    if (!fields.date) errs.date = 'Date is required'
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const parsed = parseFloat(fields.amount)
    dispatch(
      addTransaction({
        id: crypto.randomUUID(),
        merchant: fields.merchant.trim(),
        category: fields.category,
        amount: fields.isDebit ? -parsed : parsed,
        date: fields.date,
      }),
    )
    onClose()
  }

  function set<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Add Transaction</h2>

      <div className="form-field">
        <label htmlFor="merchant">Merchant</label>
        <input
          id="merchant"
          type="text"
          value={fields.merchant}
          onChange={(e) => set('merchant', e.target.value)}
          placeholder="e.g. Whole Foods"
          autoFocus
        />
        {errors.merchant && <span className="form-error">{errors.merchant}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={fields.category}
          onChange={(e) => set('category', e.target.value as TransactionCategory)}
        >
          {TRANSACTION_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Type</label>
        <div className="toggle-group" role="group" aria-label="Transaction type">
          <button
            type="button"
            className={`toggle-btn${fields.isDebit ? ' toggle-btn--active' : ''}`}
            onClick={() => set('isDebit', true)}
          >
            Debit
          </button>
          <button
            type="button"
            className={`toggle-btn${!fields.isDebit ? ' toggle-btn--active' : ''}`}
            onClick={() => set('isDebit', false)}
          >
            Credit
          </button>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={fields.amount}
          onChange={(e) => set('amount', e.target.value)}
          placeholder="0.00"
        />
        {errors.amount && <span className="form-error">{errors.amount}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={fields.date}
          onChange={(e) => set('date', e.target.value)}
        />
        {errors.date && <span className="form-error">{errors.date}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          Add
        </button>
      </div>
    </form>
  )
}
