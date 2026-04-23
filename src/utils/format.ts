const MS_PER_DAY = 86_400_000
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function formatDayHeading(isoDate: string): string {
  const date = parseIsoDate(isoDate)
  const today = startOfDay(new Date())
  const diffDays = Math.round((today.getTime() - date.getTime()) / MS_PER_DAY)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

function parseIsoDate(isoDate: string): Date {
  const match = ISO_DATE_RE.exec(isoDate)
  if (!match) {
    throw new Error(`Expected YYYY-MM-DD, got "${isoDate}"`)
  }
  // Regex guarantees three capture groups.
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}

function startOfDay(date: Date): Date {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}
