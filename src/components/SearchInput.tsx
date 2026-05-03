import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSearch } from '../store/filtersSlice'
import './SearchInput.css'

export function SearchInput() {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.filters.search)

  return (
    <div className="search-input-wrapper">
      <svg
        className="search-icon"
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
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className="search-input"
        type="search"
        placeholder="Search merchant…"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        aria-label="Search transactions by merchant"
      />
      {search && (
        <button
          className="search-clear"
          onClick={() => dispatch(setSearch(''))}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}
