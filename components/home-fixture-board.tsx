'use client'

import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { MatchStatusBadge } from '@/components/match-status-badge'
import { Flag } from '@/lib/country-flags'
import {
  divisionCode,
  divisionMatches,
  fixtureSlotLabel,
  matchClock,
  matchProgress,
  matchStatus,
  resultForDivisionMatch,
  seedRanks,
  type DivisionMatch,
} from '@/lib/championship-results'
import { siteConfig } from '@/lib/site-config'
import { MATCH_WIN_PRIZE_USD, formatUsdCompact } from '@/lib/prize-money'
import { teamCode } from '@/lib/team-codes'
import { useNow } from '@/lib/use-now'

function Team({ country, seed, align = 'left' }: { country: string; seed?: number; align?: 'left' | 'right' }) {
  return (
    <span className={`fx-team${align === 'right' ? ' fx-team--right' : ''}`} title={country}>
      <Flag country={country} className="fx-team__flag" />
      <span className="fx-team__seed">{seed ? `#${seed}` : 'NR'}</span>
      <span className="fx-team__code">{teamCode(country)}</span>
      <span className="sr-only">{country}</span>
    </span>
  )
}

function Row({ match, now, seeds }: { match: DivisionMatch; now: number; seeds: Map<string, number> }) {
  const status = matchStatus(match, now)
  const result = status === 'complete' ? resultForDivisionMatch(match) : null
  const clock = matchClock(match, now)
  const inPlay = status === 'live' || status === 'delayed'

  return (
    <li className={`fx-row is-${status}`}>
      <div className="fx-row__meta">
        <MatchStatusBadge status={status} holdMinutes={match.fixture.resultReleaseDelayMinutes} />
        <span className="fx-row__div">{divisionCode(match.division)}</span>
        <span className="fx-row__slot">{fixtureSlotLabel(match.fixture)}</span>
        <span className={`fx-row__purse${result ? ' is-paid' : ''}`}>
          {result ? `${formatUsdCompact(MATCH_WIN_PRIZE_USD)} → ${teamCode(result.winner)}` : `${formatUsdCompact(MATCH_WIN_PRIZE_USD)} purse`}
        </span>
      </div>
      <div className="fx-row__teams">
        <Team country={match.fixture.home} seed={seeds.get(match.fixture.home)} />
        <span className="fx-row__score">
          {result ? (
            <>
              <b className={result.winner === match.fixture.home ? 'is-win' : ''}>{result.homeScore}</b>
              <span aria-hidden="true">–</span>
              <b className={result.winner === match.fixture.away ? 'is-win' : ''}>{result.awayScore}</b>
            </>
          ) : 'vs'}
        </span>
        <Team country={match.fixture.away} seed={seeds.get(match.fixture.away)} align="right" />
      </div>
      <div className="fx-row__clock">
        <span className="fx-row__clock-main">{clock.main}</span>
        <span className="fx-row__clock-sub">{clock.sub}</span>
        {inPlay && (
          <span className="fx-row__bar" aria-hidden="true">
            <span style={{ width: `${Math.round(matchProgress(match, now) * 100)}%` }} />
          </span>
        )}
      </div>
    </li>
  )
}

export function HomeFixtureBoard() {
  const now = useNow(1000)
  const minute = now === null ? null : Math.floor(now / 60_000)
  const seeds = useMemo(() => (minute === null ? new Map<string, number>() : seedRanks(minute * 60_000)), [minute])

  if (now === null) {
    return <div className="fx-board fx-board--loading" role="status">Syncing fixture clock…</div>
  }

  const inPlay = divisionMatches
    .filter((match) => ['live', 'delayed'].includes(matchStatus(match, now)))
    .sort((left, right) => (
      Number(matchStatus(right, now) === 'delayed') - Number(matchStatus(left, now) === 'delayed')
      || left.endsAt - right.endsAt
    ))
  const upcoming = divisionMatches
    .filter((match) => match.startsAt > now)
    .sort((left, right) => left.startsAt - right.startsAt)
    .slice(0, 3)
  const recent = divisionMatches
    .filter((match) => match.endsAt <= now)
    .sort((left, right) => right.endsAt - left.endsAt)
    .slice(0, 3)
  const rows = [...inPlay.slice(0, 4), ...upcoming, ...recent]

  return (
    <div className="fx-board">
      <div className="fx-board__head">
        <span>Fixture board</span>
        <span>{inPlay.length} in play · showing {Math.min(inPlay.length, 4)}</span>
      </div>
      <ol className="fx-board__rows">
        {rows.map((match) => <Row key={match.id} match={match} now={now} seeds={seeds} />)}
      </ol>
      <div className="fx-board__foot">
        <span>*Seed = current overall ledger rank, recomputed every 60s. Clocks sync at 1s via WHF Ledger API {siteConfig.ledgerVersion}.</span>
        <a href="/live-matches">All {divisionMatches.length} fixtures <ArrowRight size={12} aria-hidden="true" /></a>
      </div>
    </div>
  )
}
