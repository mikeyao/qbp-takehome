# Architecture Decisions

## Step 1 — State management: Redux Toolkit

**Decision:** Use Redux Toolkit with two slices (`transactionsSlice`, `filtersSlice`) rather than local component state or a lighter alternative.

**Reasoning:**

- The app needs shared mutable state (transactions) consumed and mutated across multiple components, making component-local state impractical without prop drilling.
- Separating `filtersSlice` from `transactionsSlice` isolates UI filter state from domain data — filters can be cleared or extended independently without touching transaction logic.
- Redux Toolkit removes vanilla Redux boilerplate (no manual action creators, Immer handles immutable updates).

**Alternatives considered:**

- `useState` in `App.tsx` — too simple once filters and search need to compose with transaction mutations across components.
- Context API — suitable for read-only global data but causes full subtree re-renders on writes; RTK's `useSelector` is more targeted.
- Zustand — ergonomic and lightweight, but Redux is explicitly preferred for this exercise and RTK closes most of the ergonomics gap.

## Step 2 — Add transaction: controlled form with local state

**Decision:** `AddTransactionForm` manages its own field and error state via `useState`. A Debit/Credit toggle applies the sign before dispatching — the signed `amount` convention stays internal.

**Reasoning:**

- Form state is transient and component-local; putting it in Redux would add boilerplate with no benefit (it doesn't need to survive re-mounts or be shared).
- Controlled inputs make per-field inline validation straightforward without a form library.
- The toggle abstracts the signed `amount` convention away from the user — entering a positive number and picking a direction is more intuitive than entering `-50.00`.

**Alternatives considered:**

- Uncontrolled form with `FormData` — less re-render overhead, but per-field inline errors are awkward to wire without controlled state.
- Form state in Redux — unnecessary for ephemeral UI state that no other component needs.
- Plain signed number input — leaks an internal data convention to the user; error-prone.

## Step 3 — Delete transaction: inline row confirmation

**Decision:** A ✕ button appears on row hover; clicking reveals an inline "Delete? Yes / No" prompt within the same row rather than a modal or toast.

**Reasoning:**

- Two-step prevents accidental deletes without interrupting page flow.
- The `confirming` state is local to `TransactionRow` — no other component needs to know about it, so it doesn't belong in Redux.

**Alternatives considered:**

- Undo toast — better perceived UX but requires a timer, temporary state for the deleted item, and a toast component; disproportionate complexity for this scope.
- Confirmation modal — explicit but heavy for a single-row action with no UI library.

## Step 4 — Filter by category: memoized selector + checkbox dropdown

**Decision:** Filter logic lives in `selectFilteredTransactions` (`store/selectors.ts`) using `createSelector`. The UI is a custom checkbox dropdown in `CategoryFilter.tsx`.

**Reasoning:**

- `createSelector` is idiomatic Redux — it memoizes the filtered result and only recomputes when `transactions.items` or `filters.categories` change, keeping `App.tsx` to a single selector call with no inline logic.
- Checkbox dropdown is the standard multi-select filtering pattern — clear state, compact, works well for 10 items.

**Alternatives considered:**

- Plain util function called in `App.tsx` — simpler but re-runs on every render and isn't idiomatic Redux.
- Always-visible filter pills — no dropdown needed, but 10 chips takes significant vertical space.
- Native `<select multiple>` — requires Ctrl+click to multi-select; inconsistent with the app's UI.

**Filter tag enhancement:** Selected categories render as removable pill tags inline after the dropdown. "Clear all" appears only when 2+ categories are selected — with a single tag, clicking its × is already a "clear all" equivalent, making a second button redundant.

## Step 5 — Search: debounced input with local state

**Decision:** `SearchInput` keeps a local `inputValue` state that updates the input on every keystroke, and uses a `useEffect` + `setTimeout` (300ms) to debounce the Redux dispatch. The clear button bypasses the timer and dispatches immediately. No external debounce library.

**Reasoning:**

- Separating local `inputValue` from the Redux `search` state means the input feels instant while Redux (and the memoized selector) only recomputes after the user pauses typing.
- `useEffect` + `clearTimeout` cleanup is two lines of standard React — self-documenting and no added dependency.
- Clear should feel immediate; bypassing the debounce on the clear button avoids a jarring 300ms delay when resetting.

**Alternatives considered:**

- Immediate dispatch on every keystroke — simpler, but triggers the selector on every character typed; unnecessary at this scale but not idiomatic for search inputs.
- External debounce utility (`lodash.debounce`, `use-debounce`) — marginal ergonomic gain for a single use case; not worth the dependency.

## Testing: Vitest + React Testing Library

**Decision:** Vitest for the test runner; React Testing Library + jsdom for component tests.

**Reasoning:**

- Vitest is the natural fit for a Vite project — shares the same transform pipeline and config, zero extra bridging needed.
- RTL tests interact with components the way a user would (by role, label, text) rather than testing implementation details like internal state or class names.
- A shared `renderWithStore` helper gives each test a clean, isolated Redux store.

**Alternatives considered:**

- Jest — more widely known but requires extra ESM/Vite bridging (`babel-jest`, `ts-jest`) that Vitest eliminates.
- Enzyme — tests implementation details; RTL's user-centric approach better reflects real usage.

**Test file structure:** Co-located — each `*.test.tsx` sits next to its source file. Vitest-idiomatic, keeps pairs together on rename/move, and makes missing coverage obvious at a glance. Shared test utilities (`setup.ts`, `renderWithStore.tsx`) live in `src/test/`. A separate mirrored `__tests__/` folder was considered but adds navigation friction without meaningful benefit at this scale.
