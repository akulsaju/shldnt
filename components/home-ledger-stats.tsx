'use client'

import {
  divisionMatches,
  formatRelativeAge,
  lastLedgerWriteAt,
  matchStatus,
} from '@/lib/championship-results'
import { championshipFixtures } from '@/lib/championship-fixtures'
import { siteConfig } from '@/lib/site-config'
import { useNow } from '@/lib/use-now'

const activeTeams = new Set(championshipFixtures.flatMap(({ home, away }) => [home, away])).size

export function HomeLedgerStats() {
  const now = useNow(30_000)
  const statuses = now === null ? [] : divisionMatches.map((match) => matchStatus(match, now))
  const committed = statuses.filter((status) => status === 'complete').length
  const inPlay = statuses.filter((status) => status === 'live' || status === 'delayed').length
  const held = statuses.filter((status) => status === 'delayed').length
  const lastWrite = now === null ? 0 : lastLedgerWriteAt(now)

  const stats = [
    { value: String(activeTeams), label: 'Teams on the ledger', fine: 'Recognized NHAs · DQ entries excluded' },
    { value: now === null ? '—' : String(committed), label: 'Results committed', fine: `of ${divisionMatches.length} scheduled division matches` },
    {
      value: now === null ? '—' : String(inPlay),
      label: 'Matches in play',
      fine: held ? `${held} on result hold · 6h build windows` : '6h build windows · 1s clock sync',
      warn: held > 0,
    },
    { value: '6', label: 'Confederations', fine: 'AHC · CAH · CONCACAH · CONMEHA · OFC · WEU' },
  ]

  return (
    <div className="home-hero__statblock animate-rise delay-150">
      <div className="home-hero__stats">
        {stats.map(({ value, label, fine, warn }) => (
          <div key={label} className="home-stat">
            <p className="home-stat__value">{value}</p>
            <p className="home-stat__label">{label}</p>
            <p className={`home-stat__fine${warn ? ' is-warn' : ''}`}>{fine}</p>
          </div>
        ))}
      </div>
      <p className="home-hero__source">
        *Updated {now === null || !lastWrite ? '—' : formatRelativeAge(now - lastWrite)} via WHF Ledger API {siteConfig.ledgerVersion} · counts refresh every 30s
      </p>
    </div>
  )
}
