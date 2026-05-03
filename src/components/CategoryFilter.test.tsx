import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryFilter } from './CategoryFilter'
import { renderWithStore } from '../test/renderWithStore'

describe('CategoryFilter', () => {
  it('renders the trigger button', () => {
    renderWithStore(<CategoryFilter />)
    expect(screen.getByRole('button', { name: /category/i })).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    renderWithStore(<CategoryFilter />)
    await userEvent.click(screen.getByRole('button', { name: /category/i }))
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
  })

  it('selecting a category shows it as a tag', async () => {
    renderWithStore(<CategoryFilter />)
    await userEvent.click(screen.getByRole('button', { name: /category/i }))
    await userEvent.click(screen.getByRole('option', { name: /Groceries/ }))
    expect(screen.getByLabelText('Remove Groceries filter')).toBeInTheDocument()
  })

  it('removing a tag via × deselects the category', async () => {
    renderWithStore(<CategoryFilter />)
    await userEvent.click(screen.getByRole('button', { name: /category/i }))
    await userEvent.click(screen.getByRole('option', { name: /Groceries/ }))
    await userEvent.click(screen.getByLabelText('Remove Groceries filter'))
    expect(screen.queryByLabelText('Remove Groceries filter')).not.toBeInTheDocument()
  })

  it('shows Clear all only when 2+ categories are selected', async () => {
    renderWithStore(<CategoryFilter />)
    await userEvent.click(screen.getByRole('button', { name: /category/i }))
    await userEvent.click(screen.getByRole('option', { name: /Groceries/ }))
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('option', { name: /Gas/ }))
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument()
  })

  it('Clear all removes all tags', async () => {
    renderWithStore(<CategoryFilter />)
    await userEvent.click(screen.getByRole('button', { name: /category/i }))
    await userEvent.click(screen.getByRole('option', { name: /Groceries/ }))
    await userEvent.click(screen.getByRole('option', { name: /Gas/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.queryByLabelText('Remove Groceries filter')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Remove Gas filter')).not.toBeInTheDocument()
  })
})
