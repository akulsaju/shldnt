'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, Trophy } from 'lucide-react'
import { Flag } from '@/lib/country-flags'
import {
  countdownParts,
  divisionMatches,
  formatResult,
  resultForDivisionMatch,
  type DivisionMatch,
} from '@/lib/championship-results'

function liveMatchesAt(now: number) {
  return divisionMatches.filter((match) => match.startsAt <= now && now < match.endsAt)
}

function nextMatchAt(now: number) {
  return divisionMatches.find((match) => match.startsAt > now)
}

function latestCompletedMatchAt(now: number) {
  return divisionMatches
    .filter((match) => match.endsAt <= now)
    .sort((left, right) => right.endsAt - left.endsAt)[0]
}

function recentCompletedMatchAt(now: number) {
  return divisionMatches
    .filter((match) => match.endsAt <= now && now - match.endsAt < 30 * 60 * 1000)
    .sort((left, right) => right.endsAt - left.endsAt)
}

function MatchBanner({ match, now }: { match: DivisionMatch; now: number }) {
  const isLive = match.startsAt <= now && now < match.endsAt
  const isComplete = match.endsAt <= now
  const result = isComplete ? resultForDivisionMatch(match) : null
  const countdown = isLive ? match.endsAt - now : match.startsAt - now

  return (
    <section
      aria-label={isLive ? 'Live championship match' : 'Championship match update'}
      className="border-b border-cyan-200/15 bg-gradient-to-r from-[#0b1c35] via-[#102d59] to-[#171a43] px-4 py-4 text-white sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
            {isLive ? <span className="size-2 animate-pulse rounded-full bg-emerald-300" /> : <Clock3 size={13} aria-hidden="true" />}
            {isLive ? 'Live now' : isComplete ? 'Latest result' : 'Up next'}
            <span className="text-blue-100/55">· {match.division.label} · Group {match.fixture.group}</span>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="flex items-center gap-2 text-sm font-semibold"><Flag country={match.fixture.home} className="h-5 w-8 rounded object-cover" />{match.fixture.home}</span>
            <span className="text-xs font-black uppercase tracking-widest text-cyan-200">vs</span>
            <span className="flex items-center gap-2 text-sm font-semibold"><Flag country={match.fixture.away} className="h-5 w-8 rounded object-cover" />{match.fixture.away}</span>
            {result && <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-sm font-bold text-emerald-200">{formatResult(result)} · {result.winner} won</span>}
          </div>
        </div>
        <div className="shrink-0 text-center sm:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100/80">
            {isLive ? 'Results in' : isComplete ? 'Final score' : 'Starts in'}
          </p>
          {!isComplete && <p aria-live="polite" className="mt-1 font-mono text-2xl font-bold tabular-nums">{countdownParts(countdown)}</p>}
          {isComplete && result && <p className="mt-1 text-sm font-semibold text-emerald-200">{formatResult(result)} · {result.winner} won</p>}
        </div>
      </div>
      <a href="/championship" className="mx-auto mt-3 flex max-w-7xl items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100/75 hover:text-white">
        All fixtures <ArrowRight size={12} aria-hidden="true" />
      </a>
    </section>
  )
}

export function ChampionshipLiveBanner() {
  const [now, setNow] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const clock = window.setInterval(update, 1000)
    const rotator = window.setInterval(() => setRotation((value) => value + 1), 8000)
    return () => {
      window.clearInterval(clock)
      window.clearInterval(rotator)
    }
  }, [])

  if (now === null) return <div className="h-[88px] border-b border-cyan-200/15 bg-[#102d59]" aria-hidden="true" />

  const active = liveMatchesAt(now)
  const recentResults = recentCompletedMatchAt(now)
  const match = active.length > 0
    ? active[rotation % active.length]
    : recentResults.length > 0
      ? recentResults[rotation % recentResults.length]
      : nextMatchAt(now) ?? latestCompletedMatchAt(now)

  return match ? <MatchBanner match={match} now={now} /> : null
}
