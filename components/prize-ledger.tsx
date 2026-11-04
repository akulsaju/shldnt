'use client'

import { Trophy } from 'lucide-react'
import { divisionMatches } from '@/lib/championship-results'
import type { ChampionshipDivision } from '@/lib/championship-rosters'
import {
  CHAMPION_PRIZE_USD,
  MATCH_WIN_PRIZE_USD,
  formatUsd,
  formatUsdCompact,
} from '@/lib/prize-money'
import { useNow } from '@/lib/use-now'

export function PrizeLedger({ divisionKey, className = '' }: { divisionKey?: ChampionshipDivision['key']; className?: string }) {
  const now = useNow(15_000)
  const scoped = divisionMatches.filter((match) => !divisionKey || match.division.key === divisionKey)
  const paidWins = now === null ? 0 : scoped.filter((match) => match.endsAt <= now).length
  const paid = paidWins * MATCH_WIN_PRIZE_USD
  const unpaid = (scoped.length - paidWins) * MATCH_WIN_PRIZE_USD

  return (
    <section aria-label="Prize money" className={`prize-strip ${className}`}>
      <div className="prize-strip__cell prize-strip__cell--champion">
        <p className="prize-strip__label"><Trophy size={12} aria-hidden="true" /> World champion</p>
        <p className="prize-strip__value">{formatUsd(CHAMPION_PRIZE_USD)}</p>
        <p className="prize-strip__fine">Paid to the winning nation</p>
      </div>
      <div className="prize-strip__cell">
        <p className="prize-strip__label">Per match win</p>
        <p className="prize-strip__value">{formatUsd(MATCH_WIN_PRIZE_USD)}</p>
        <p className="prize-strip__fine">Every division match · paid at FT</p>
      </div>
      <div className="prize-strip__cell">
        <p className="prize-strip__label">Paid to date</p>
        <p className="prize-strip__value">{now === null ? '—' : formatUsdCompact(paid)}</p>
        <p className="prize-strip__fine">{now === null ? 'Syncing…' : `${paidWins} wins × ${formatUsdCompact(MATCH_WIN_PRIZE_USD)}`}</p>
      </div>
      <div className="prize-strip__cell">
        <p className="prize-strip__label">Match pool remaining</p>
        <p className="prize-strip__value">{now === null ? '—' : formatUsdCompact(unpaid)}</p>
        <p className="prize-strip__fine">*Held results pay after release</p>
      </div>
    </section>
  )
}
