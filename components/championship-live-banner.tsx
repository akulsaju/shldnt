'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, Trophy } from 'lucide-react'
import { Flag } from '@/lib/country-flags'
import {
  countdownParts,
  divisionMatches,
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

function featuredUaeFranceUnder19At(now: number) {
  return divisionMatches.find((match) => (
    match.division.key === 'under19'
    && [match.fixture.home, match.fixture.away].includes('United Arab Emirates')
    && [match.fixture.home, match.fixture.away].includes('France')
    && match.startsAt <= now
    && now < match.endsAt
  ))
}

function MatchBanner({ match, now }: { match: DivisionMatch; now: number }) {
  const isLive = match.startsAt <= now && now < match.endsAt
  const isComplete = match.endsAt <= now
  const result = isComplete ? resultForDivisionMatch(match) : null
  const countdown = isLive ? match.endsAt - now : match.startsAt - now

  return (
    <section
      aria-label={isLive ? 'Live championship match' : 'Championship match update'}
      className="championship-live-banner border-b border-cyan-200/15 px-4 py-5 text-white sm:px-6"
    >
      <div className="championship-banner-panel mx-auto grid max-w-7xl gap-5 rounded-2xl border px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`championship-banner-status inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] ${isLive ? 'is-live' : isComplete ? 'is-complete' : 'is-up-next'}`}>
              {isLive ? <span className="size-2 animate-pulse rounded-full bg-emerald-300" /> : isComplete ? <Trophy size={12} aria-hidden="true" /> : <Clock3 size={12} aria-hidden="true" />}
              {isLive ? 'Live now' : isComplete ? 'Latest result' : 'Up next'}
            </span>
            <span className="championship-banner-meta text-[11px] font-semibold uppercase tracking-[0.13em]">
              {match.division.label} <span aria-hidden="true">·</span> Group {match.fixture.group}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="championship-banner-team flex items-center gap-2.5 text-base font-bold sm:text-lg">
              <Flag country={match.fixture.home} className="h-7 w-10 rounded object-cover shadow-md" />
              {match.fixture.home}
            </span>
            {!result && (
              <span className="championship-banner-versus text-[10px] font-black uppercase tracking-[0.2em]">VS</span>
            )}
            <span className="championship-banner-team flex items-center gap-2.5 text-base font-bold sm:text-lg">
              <Flag country={match.fixture.away} className="h-7 w-10 rounded object-cover shadow-md" />
              {match.fixture.away}
            </span>
            {result && <span className="championship-banner-winner text-sm font-bold">{result.winner} won</span>}
          </div>
        </div>
        <div className={`championship-banner-clock rounded-xl border px-5 py-3 text-center sm:min-w-52 sm:text-right ${isLive ? 'is-live' : isComplete ? 'is-complete' : 'is-up-next'}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em]">
            {isLive ? 'Results in' : isComplete ? 'Match result' : 'Starts in'}
          </p>
          {!isComplete && <p aria-live="polite" className="mt-1 font-mono text-3xl font-extrabold leading-none tabular-nums tracking-wider">{countdownParts(countdown)}</p>}
          {isComplete && result && <p className="mt-1 text-sm font-bold">{result.winner} won</p>}
          {!isComplete && <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] opacity-75">Six-hour hackathon</p>}
        </div>
      </div>
      <a href="/championship" className="championship-banner-link mx-auto mt-3 flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]">
        View all championship fixtures <ArrowRight size={12} aria-hidden="true" />
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
  const featuredMatch = featuredUaeFranceUnder19At(now)
  const recentResults = recentCompletedMatchAt(now)
  const match = featuredMatch
    ?? (active.length > 0
      ? active[rotation % active.length]
    : recentResults.length > 0
      ? recentResults[rotation % recentResults.length]
      : nextMatchAt(now) ?? latestCompletedMatchAt(now))

  return match ? <MatchBanner match={match} now={now} /> : null
}
