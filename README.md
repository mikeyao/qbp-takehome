# Quicken — Transactions Take-Home

Thanks for taking the time. This is a small React + TypeScript app that renders a list of mock transactions grouped by day. Your job is to add a few features and send it back.

## Stack

- React 18
- TypeScript 5
- Vite 7
- Prettier

No UI framework. Feel free to add one if you want, but it isn't required.

## Requirements

- Node 20+ (see `.nvmrc`)

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically http://localhost:5173).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck and build for production
- `npm run preview` — preview the production build
- `npm run typecheck` — run TypeScript in no-emit mode
- `npm run format` — format the project with Prettier
- `npm run format:check` — verify formatting without writing

## Project layout

```
src/
  App.tsx                    # root component
  main.tsx                   # React entry point
  types.ts                   # Category, TransactionCategory, TRANSACTION_CATEGORIES, Transaction
  styles.css                 # global styles
  data/
    transactions.ts          # seed data — mock transactions for the last 7 days
  components/
    DayGroup.tsx             # renders a single day's header + rows
    TransactionRow.tsx       # renders one transaction
  utils/
    format.ts                # currency + date formatting helpers
    transactions.ts          # grouping / sorting helpers
```

## Existing type conventions

- `Transaction.amount` is **signed**: positive = credit (money in), negative = debit (money out). There is no separate `type` field — the sign is the source of truth.
- `Category` is a const object in `types.ts`. `TransactionCategory` (the union) and `TRANSACTION_CATEGORIES` (the readonly array of every category) are derived from it.
- The seed data is exported as `readonly Transaction[]` and rendered directly in `App.tsx`. There is no state management yet — that is part of the exercise.

---

# The exercise

Add the features below to the app. Treat this as a real project where teammates would also need to be able to read and understand your changes, the architecture and your patterns matter, we expect clean code and standards followed, etc.

Ensure that you are committing your changes regularly and in a logical way (as if you were actually working on these features). When you're done, follow the submission steps below — we'll then jump on a call to review together.

## 1. Introduce state management

Before adding any feature, decide where the transactions live. The seed currently flows as a frozen array straight through `App.tsx`. You need to own it somewhere that supports the mutations below. You pick the approach, but Redux is preferred.

## 2. Add a transaction

Let the user add a new transaction from the app:

- Capture merchant, category, amount, and date.
- Use `TRANSACTION_CATEGORIES` to populate the category dropdown.
- Validate input before submit.
- Prepend the new transaction to the list; a new day group should appear if the chosen date isn't already visible.

## 3. Delete a transaction

Let the user delete a transaction. Confirmation modal, undo toast, inline control — your call. Be deliberate about the UX.

## 4. Filter by category

Let the user filter the visible transactions by category, backed by `TRANSACTION_CATEGORIES`. A single-select dropdown is fine; multi-select is better. Include an "all categories" option.

## 5. Search (stretch)

If you have time, let the user narrow the list further with a text search across merchant. Include a clear affordance to reset, and make sure it composes sensibly with the category filter from step 4.

---

# What we look for

- Component boundaries and where state lives
- Type safety — the project ships with `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` on purpose
- Naming and readability; separation between domain logic and UI
- A sensible commit history — small, focused commits with clear messages, not one giant "added features" commit. Each commit should tell a reviewer what changed and why.

# Submission

1. Fork the repo.
2. Make your changes in logical, focused commits.
3. Push your commits to your fork.
4. Email a link to your fork when you're finished.

# Ground rules

- **Time budget:** Spend no more than 4 hours on this. Ideally 2h or less. We really want to be respectful of your time.
- **Dependencies:** add only what you need. Justify non-trivial additions in the PR.
- **Formatting:** run `npm run format` before committing.
- **Build:** `npm run build` should pass before you open the PR.
- **Agents / Coding Assistants:** You are welcome to use them, but you must own and understand every line. Keeping things simple and straight forward is critical, You'll be asked to walk us through the code in a follow-up conversation.
