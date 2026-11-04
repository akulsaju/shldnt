'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Clock3, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { MatchStatusBadge } from '@/components/match-status-badge'
import { SystemStatus } from '@/components/system-status'
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
  shortHash,
  type DivisionMatch,
} from '@/lib/championship-results'
import { formatLocalDate, formatLocalTime, regionTimeZone } from '@/lib/championship-fixtures'
import { siteConfig } from '@/lib/site-config'
import { CHAMPION_PRIZE_USD, MATCH_WIN_PRIZE_USD, formatUsd } from '@/lib/prize-money'
import { teamCode } from '@/lib/team-codes'

function TeamLine({ country, seed, score, isWinner }: { country: string; seed?: number; score?: number; isWinner?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${score !== undefined && !isWinner ? 'opacity-60' : ''}`}>
      <Flag country={country} className="h-6 w-9 shrink-0 rounded-[3px] object-cover shadow-sm" />
      <span className="w-8 shrink-0 font-mono text-[10px] font-bold tabular-nums text-cyan-200/70">{seed ? `#${seed}` : 'NR'}</span>
      <span className="font-mono text-sm font-black tracking-[0.06em] text-white">{teamCode(country)}</span>
      <span className="min-w-0 truncate text-xs text-blue-100/55">{country}</span>
      {score !== undefined && (
        <span className={`ml-auto font-mono text-xl font-black tabular-nums ${isWinner ? 'text-emerald-200' : 'text-blue-100/70'}`}>{score}</span>
      )}
    </div>
  )
}

function MatchCard({ match, now, seeds }: { match: DivisionMatch; now: number; seeds: Map<string, number> }) {
  const status = matchStatus(match, now)
  const result = status === 'complete' ? resultForDivisionMatch(match) : null
  const clock = matchClock(match, now)
  const inPlay = status === 'live' || status === 'delayed'
  const timeZone = regionTimeZone(match.fixture.home)
  const progress = Math.round(matchProgress(match, now) * 100)

  return (
    <article className={`rounded-xl border bg-[#0b2142] p-4 text-white transition-opacity ${status === 'delayed' ? 'border-orange-300/45 shadow-[0_0_0_1px_rgba(251,146,60,.15)]' : status === 'live' ? 'border-emerald-300/25' : 'border-white/10'} ${status === 'complete' ? 'opacity-55 hover:opacity-100' : ''}`}>
      <div className="flex flex-wrap items-center gap-2">
        <MatchStatusBadge status={status} holdMinutes={match.fixture.resultReleaseDelayMinutes} />
        <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-blue-50">{divisionCode(match.division)}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-blue-100/60">{fixtureSlotLabel(match.fixture)}</span>
      </div>

      <div className="mt-4 space-y-2.5">
        <TeamLine country={match.fixture.home} seed={seeds.get(match.fixture.home)} score={result?.homeScore} isWinner={result?.winner === match.fixture.home} />
        <TeamLine country={match.fixture.away} seed={seeds.get(match.fixture.away)} score={result?.awayScore} isWinner={result?.winner === match.fixture.away} />
      </div>

      <div aria-live={inPlay ? 'polite' : undefined} className="mt-4 flex items-end justify-between gap-3 border-t border-white/10 pt-3">
        <div>
          <p className={`font-mono text-lg font-black tabular-nums leading-none ${status === 'delayed' ? 'text-orange-200' : inPlay ? 'text-white' : 'text-blue-100/80'}`}>{clock.main}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-blue-100/55">{clock.sub}</p>
        </div>
        <p className="text-right text-[10px] leading-4 text-blue-100/50">
          {formatLocalDate(new Date(match.startsAt), timeZone)} · {formatLocalTime(new Date(match.startsAt), timeZone)}
          {result
            ? <><br /><span className="text-emerald-200/80">+3 pts · +{formatUsd(MATCH_WIN_PRIZE_USD)} → {teamCode(result.winner)}</span></>
            : <><br /><span className="text-amber-200/80">Purse {formatUsd(MATCH_WIN_PRIZE_USD)} to winner</span></>}
        </p>
      </div>
      {inPlay && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div className={`h-full ${status === 'delayed' ? 'bg-orange-300' : 'bg-emerald-300'}`} style={{ width: `${progress}%` }} />
        </div>
      )}
      <p className="mt-3 truncate font-mono text-[9px] text-blue-100/35">
        id={match.id}{result ? ` · sha256:${shortHash(`${match.id}:final`, 12)}` : inPlay ? ` · elapsed ${progress}%` : ''}
      </p>
    </article>
  )
}
export default function LiveMatchesPage() {
  const [now, setNow] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const matches = useMemo(() => {
    if (now === null) return { live: [], upcoming: [], completed: [] }
    const query = search.trim().toLowerCase()
    const filtered = divisionMatches.filter(({ fixture, division }) => (
      !query || `${fixture.home} ${fixture.away} ${teamCode(fixture.home)} ${teamCode(fixture.away)} ${division.label} ${fixture.group}`.toLowerCase().includes(query)
    ))
    const live = filtered
      .filter((match) => match.startsAt <= now && now < match.endsAt)
      .sort((a, b) => Number(matchStatus(b, now) === 'delayed') - Number(matchStatus(a, now) === 'delayed') || a.endsAt - b.endsAt)
    const upcoming = filtered.filter((match) => match.startsAt > now).sort((a, b) => a.startsAt - b.startsAt).slice(0, 12)
    const completed = filtered.filter((match) => match.endsAt <= now).sort((a, b) => b.endsAt - a.endsAt).slice(0, 12)
    return { live, upcoming, completed }
  }, [now, search])

  const minute = now === null ? null : Math.floor(now / 60_000)
  const seeds = useMemo(() => (minute === null ? new Map<string, number>() : seedRanks(minute * 60_000)), [minute])

  return (
    <main className="min-h-screen bg-[#071426] text-white">
      <SiteHeader label="NHA Portal" />
      <section className="border-b border-white/10 bg-gradient-to-br from-[#0b1c35] via-[#102d59] to-[#17143f]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <SystemStatus />
          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">WHC 2026 · qualifiers · {divisionMatches.length} division matches</p>
          <div className="mt-5 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Live matches</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80">
                Every division match is a 06:00:00 build window. Clocks tick at 1s; a result commits to the ledger when the window closes, or after the posted hold if an integrity review is open.
                The winner of every match banks {formatUsd(MATCH_WIN_PRIZE_USD)}; the world champion takes {formatUsd(CHAMPION_PRIZE_USD)}.
              </p>
              <p className="mt-3 font-mono text-[10px] text-blue-100/50">
                *Seed = current overall ledger rank (W 3 · D 1 · L 0), recomputed every 60s via WHF Ledger API {siteConfig.ledgerVersion}.
              </p>
            </div>
            <a href="/championship" className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-50 hover:bg-cyan-200/20">
              Full match calendar <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <label className="mt-8 block max-w-lg">
            <span className="sr-only">Search by country, team code, division, or group</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search country, code (UAE), division, or group"
              className="w-full rounded-xl border border-white/20 bg-[#071f40]/80 px-4 py-3 text-sm text-white placeholder:text-blue-100/50 focus:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
            />
          </label>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-5 py-12 lg:px-8 lg:py-16">
        {now === null ? (
          <p role="status" className="text-sm text-blue-100/75">Loading match schedule…</p>
        ) : (
          <>
            <section aria-labelledby="live-heading">
              <div className="mb-5 flex items-center gap-3">
                <span className="size-2.5 animate-pulse rounded-full bg-emerald-300" />
                <h2 id="live-heading" className="text-2xl font-semibold">Happening now</h2>
                <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] font-bold text-blue-100">{matches.live.length}</span>
                {matches.live.some((match) => matchStatus(match, now) === 'delayed') && (
                  <span className="rounded-full bg-orange-400/15 px-2.5 py-1 font-mono text-[10px] font-bold text-orange-200">
                    {matches.live.filter((match) => matchStatus(match, now) === 'delayed').length} on hold
                  </span>
                )}
              </div>
              {matches.live.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matches.live.map((match) => <MatchCard key={match.id} match={match} now={now} seeds={seeds} />)}
                </div>
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 text-sm text-blue-100/70">
                  {search ? 'No live matches match your search.' : 'No matches are happening right now. Upcoming matches are listed below.'}
                </p>
              )}
            </section>

            <section aria-labelledby="upcoming-heading">
              <div className="mb-5 flex items-center gap-3">
                <Clock3 size={17} className="text-cyan-200" aria-hidden="true" />
                <h2 id="upcoming-heading" className="text-2xl font-semibold">Coming up next</h2>
              </div>
              {matches.upcoming.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matches.upcoming.map((match) => <MatchCard key={match.id} match={match} now={now} seeds={seeds} />)}
                </div>
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 text-sm text-blue-100/70">
                  {search ? 'No upcoming matches match your search.' : 'There are no upcoming matches on the current schedule.'}
                </p>
              )}
            </section>

            <section aria-labelledby="recent-heading">
              <div className="mb-5 flex items-center gap-3">
                <Trophy size={17} className="text-emerald-200" aria-hidden="true" />
                <h2 id="recent-heading" className="text-2xl font-semibold">Latest results</h2>
                <span className="font-mono text-[10px] text-blue-100/45">scores locked · committed to ledger</span>
              </div>
              {matches.completed.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matches.completed.map((match) => <MatchCard key={match.id} match={match} now={now} seeds={seeds} />)}
                </div>
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 text-sm text-blue-100/70">
                  {search ? 'No completed matches match your search.' : 'There are no completed division matches yet.'}
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  )
}
