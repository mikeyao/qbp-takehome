import { useEffect, useRef, useState } from 'react'
import './CategoryFilter.css'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCategories } from '../store/filtersSlice'
import { TRANSACTION_CATEGORIES, type TransactionCategory } from '../types'

export function CategoryFilter() {
  const dispatch = useAppDispatch()
  const selected = useAppSelector((state) => state.filters.categories)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function toggleCategory(category: TransactionCategory) {
    const next = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category]
    dispatch(setCategories(next))
  }

  function clearAll() {
    dispatch(setCategories([]))
    setOpen(false)
  }

  return (
    <div className="category-filter-row">
      <div className="category-filter" ref={dropdownRef}>
        <button
          className={`filter-trigger${selected.length > 0 ? ' filter-trigger--active' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          Category
          <svg
            className="filter-chevron"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div className="filter-dropdown" role="listbox" aria-multiselectable="true">
            <button className="filter-option filter-option--all" onClick={clearAll}>
              <span
                className={`filter-check${selected.length === 0 ? ' filter-check--visible' : ''}`}
              >
                ✓
              </span>
              All categories
            </button>
            <div className="filter-divider" />
            {TRANSACTION_CATEGORIES.map((cat) => {
              const checked = selected.includes(cat)
              return (
                <button
                  key={cat}
                  className={`filter-option${checked ? ' filter-option--checked' : ''}`}
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggleCategory(cat)}
                >
                  <span className={`filter-check${checked ? ' filter-check--visible' : ''}`}>
                    ✓
                  </span>
                  {cat}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {selected.map((cat) => (
        <button
          key={cat}
          className="filter-tag"
          onClick={() => toggleCategory(cat)}
          aria-label={`Remove ${cat} filter`}
        >
          {cat}
          <span className="filter-tag-remove" aria-hidden="true">
            ×
          </span>
        </button>
      ))}

      {selected.length >= 2 && (
        <button className="filter-clear-all" onClick={clearAll}>
          Clear all
        </button>
      )}
    </div>
  )
}
