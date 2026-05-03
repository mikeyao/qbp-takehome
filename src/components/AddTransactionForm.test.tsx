import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTransactionForm } from './AddTransactionForm'
import { renderWithStore } from '../test/renderWithStore'

function setup() {
  const onClose = vi.fn()
  renderWithStore(<AddTransactionForm onClose={onClose} />)
  return { onClose }
}

describe('AddTransactionForm', () => {
  it('renders all fields', () => {
    setup()
    expect(screen.getByLabelText('Merchant')).toBeInTheDocument()
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    setup()
    await userEvent.clear(screen.getByLabelText('Merchant'))
    await userEvent.clear(screen.getByLabelText('Amount'))
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByText('Merchant is required')).toBeInTheDocument()
    expect(screen.getByText('Enter a positive amount')).toBeInTheDocument()
  })

  it('calls onClose after valid submit', async () => {
    const { onClose } = setup()
    await userEvent.type(screen.getByLabelText('Merchant'), 'Starbucks')
    await userEvent.type(screen.getByLabelText('Amount'), '5.50')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('defaults to Debit type', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Debit' })).toHaveClass('toggle-btn--active')
  })

  it('calls onClose when Cancel is clicked', async () => {
    const { onClose } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
