import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from './SearchInput'
import { renderWithStore } from '../test/renderWithStore'

describe('SearchInput', () => {
  it('renders the search input', () => {
    renderWithStore(<SearchInput />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('updates input value immediately on typing', async () => {
    renderWithStore(<SearchInput />)
    await userEvent.type(screen.getByRole('searchbox'), 'amazon')
    expect(screen.getByRole('searchbox')).toHaveValue('amazon')
  })

  it('shows clear button when input has value', async () => {
    renderWithStore(<SearchInput />)
    await userEvent.type(screen.getByRole('searchbox'), 'test')
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('clears input immediately when clear button is clicked', async () => {
    renderWithStore(<SearchInput />)
    await userEvent.type(screen.getByRole('searchbox'), 'test')
    await userEvent.click(screen.getByLabelText('Clear search'))
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('does not show clear button when input is empty', () => {
    renderWithStore(<SearchInput />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })
})
