export const CHAMPION_PRIZE_USD = 1_000_000
export const MATCH_WIN_PRIZE_USD = 10_000

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const usdCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
})

export function formatUsd(amount: number) {
  return usd.format(amount)
}

export function formatUsdCompact(amount: number) {
  return usdCompact.format(amount)
}
