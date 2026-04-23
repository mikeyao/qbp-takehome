import { Category, type Transaction } from '../types'

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// prettier-ignore
export const transactions: readonly Transaction[] = [
  { id: 't1',  date: daysAgo(0), merchant: 'Blue Bottle Coffee', category: Category.FoodAndDrink,   amount:   -5.75 },
  { id: 't2',  date: daysAgo(0), merchant: 'Whole Foods',        category: Category.Groceries,      amount:  -84.22 },
  { id: 't3',  date: daysAgo(0), merchant: 'Shell',              category: Category.Gas,            amount:  -46.10 },

  { id: 't4',  date: daysAgo(1), merchant: 'Amazon',             category: Category.Shopping,       amount:  -29.99 },
  { id: 't5',  date: daysAgo(1), merchant: 'Netflix',            category: Category.Entertainment,  amount:  -15.49 },

  { id: 't6',  date: daysAgo(2), merchant: 'Acme Corp Payroll',  category: Category.Income,         amount: 2450.00 },
  { id: 't7',  date: daysAgo(2), merchant: 'Chipotle',           category: Category.FoodAndDrink,   amount:  -13.40 },
  { id: 't8',  date: daysAgo(2), merchant: 'Uber',               category: Category.Transportation, amount:  -22.15 },

  { id: 't9',  date: daysAgo(3), merchant: 'Trader Joe’s',       category: Category.Groceries,      amount:  -52.88 },
  { id: 't10', date: daysAgo(3), merchant: 'Venmo — Sam',        category: Category.Transfer,       amount:   40.00 },

  { id: 't11', date: daysAgo(4), merchant: 'Comcast',            category: Category.Utilities,      amount:  -89.99 },
  { id: 't12', date: daysAgo(4), merchant: 'Starbucks',          category: Category.FoodAndDrink,   amount:   -6.25 },
  { id: 't13', date: daysAgo(4), merchant: 'Target',             category: Category.Shopping,       amount:  -47.63 },
  { id: 't14', date: daysAgo(4), merchant: 'Spotify',            category: Category.Entertainment,  amount:  -10.99 },

  { id: 't15', date: daysAgo(5), merchant: 'Delta Airlines',     category: Category.Travel,         amount: -312.40 },

  { id: 't16', date: daysAgo(6), merchant: 'Chevron',            category: Category.Gas,            amount:  -51.77 },
  { id: 't17', date: daysAgo(6), merchant: 'Costco',             category: Category.Groceries,      amount: -164.05 },
  { id: 't18', date: daysAgo(6), merchant: 'Apple',              category: Category.Shopping,       amount:   -9.99 },
]
