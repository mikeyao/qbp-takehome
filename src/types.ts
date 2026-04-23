export const Category = {
  FoodAndDrink: 'Food & Drink',
  Groceries: 'Groceries',
  Gas: 'Gas',
  Shopping: 'Shopping',
  Entertainment: 'Entertainment',
  Income: 'Income',
  Transportation: 'Transportation',
  Transfer: 'Transfer',
  Utilities: 'Utilities',
  Travel: 'Travel',
} as const

export type TransactionCategory = (typeof Category)[keyof typeof Category]

export const TRANSACTION_CATEGORIES: readonly TransactionCategory[] = Object.values(Category)

// `amount` is signed: positive for credits (money in), negative for debits
// (money out). Do not introduce a separate `type` field — sign is the source
// of truth.
export interface Transaction {
  id: string
  date: string
  merchant: string
  category: TransactionCategory
  amount: number
}
