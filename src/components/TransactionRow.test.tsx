import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { TransactionRow } from './TransactionRow'
import type { Transaction } from '../types'

const tx: Transaction = {
  id: '1',
  date: '2024-01-01',
  merchant: 'Whole Foods',
  category: 'Groceries',
  amount: -42.5,
}

describe('TransactionRow', () => {
  it('renders merchant, category and amount', () => {
    render(<TransactionRow transaction={tx} onDelete={vi.fn()} />)
    expect(screen.getByText('Whole Foods')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('$42.50')).toBeInTheDocument()
  })

  it('shows inline confirmation after clicking delete', async () => {
    render(<TransactionRow transaction={tx} onDelete={vi.fn()} />)
    await userEvent.click(screen.getByLabelText('Delete Whole Foods'))
    expect(screen.getByText('Delete?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
  })

  it('calls onDelete when Yes is confirmed', async () => {
    const onDelete = vi.fn()
    render(<TransactionRow transaction={tx} onDelete={onDelete} />)
    await userEvent.click(screen.getByLabelText('Delete Whole Foods'))
    await userEvent.click(screen.getByRole('button', { name: 'Yes' }))
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('cancels confirmation when No is clicked', async () => {
    render(<TransactionRow transaction={tx} onDelete={vi.fn()} />)
    await userEvent.click(screen.getByLabelText('Delete Whole Foods'))
    await userEvent.click(screen.getByRole('button', { name: 'No' }))
    expect(screen.queryByText('Delete?')).not.toBeInTheDocument()
  })
})
