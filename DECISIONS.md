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
