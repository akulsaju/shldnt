'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Clock3, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { Flag } from '@/lib/country-flags'
import {
  countdownParts,
  divisionMatches,
  resultForDivisionMatch,
  type DivisionMatch,
} from '@/lib/championship-results'
import { formatLocalDate, formatLocalTime, regionTimeZone } from '@/lib/championship-fixtures'

function MatchCard({ match, now }: { match: DivisionMatch; now: number }) {
  const isLive = match.startsAt <= now && now < match.endsAt
  const isComplete = match.endsAt <= now
  const result = isComplete ? resultForDivisionMatch(match) : null
  const timeZone = regionTimeZone(match.fixture.home)

  return (
    <article className="rounded-2xl border border-white/15 bg-[#102d59] p-5 text-white shadow-lg shadow-blue-950/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] ${isLive ? 'bg-emerald-300/15 text-emerald-200' : isComplete ? 'bg-cyan-200/15 text-cyan-100' : 'bg-white/10 text-blue-100'}`}>
          {isLive ? <span className="size-2 animate-pulse rounded-full bg-emerald-300" /> : isComplete ? <Trophy size={12} aria-hidden="true" /> : <Clock3 size={12} aria-hidden="true" />}
          {isLive ? 'Live now' : isComplete ? 'Completed' : 'Upcoming'}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-100/70">{match.division.label} · Group {match.fixture.group}</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="min-w-0">
          <Flag country={match.fixture.home} className="h-7 w-10 rounded object-cover shadow-sm" />
          <p className="mt-2 truncate text-sm font-bold text-white">{match.fixture.home}</p>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">{result ? '·' : 'VS'}</span>
        <div className="min-w-0 text-right">
          <Flag country={match.fixture.away} className="ml-auto h-7 w-10 rounded object-cover shadow-sm" />
          <p className="mt-2 truncate text-sm font-bold text-white">{match.fixture.away}</p>
        </div>
      </div>

      {result ? (
        <p className="mt-4 rounded-xl border border-emerald-200/20 bg-emerald-300/10 px-3 py-2 text-xs font-bold text-emerald-100">
          {result.winner} won
        </p>
      ) : (
        <p aria-live={isLive ? 'polite' : undefined} className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#071f40]/70 px-3 py-2 text-xs font-semibold text-blue-100">
          <Clock3 size={13} aria-hidden="true" />
          {isLive ? `Results in ${countdownParts(match.endsAt - now)}` : `Starts in ${countdownParts(match.startsAt - now)}`}
        </p>
      )}
      <p className="mt-3 text-[10px] text-blue-100/65">
        {formatLocalDate(new Date(match.startsAt), timeZone)} · {formatLocalTime(new Date(match.startsAt), timeZone)}
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
      !query || `${fixture.home} ${fixture.away} ${division.label} ${fixture.group}`.toLowerCase().includes(query)
    ))
    const live = filtered.filter((match) => match.startsAt <= now && now < match.endsAt)
    const upcoming = filtered.filter((match) => match.startsAt > now).sort((a, b) => a.startsAt - b.startsAt).slice(0, 12)
    const completed = filtered.filter((match) => match.endsAt <= now).sort((a, b) => b.endsAt - a.endsAt).slice(0, 12)
    return { live, upcoming, completed }
  }, [now, search])

  return (
    <main className="min-h-screen bg-[#071426] text-white">
      <SiteHeader label="NHA Portal" />
      <section className="border-b border-white/10 bg-gradient-to-br from-[#0b1c35] via-[#102d59] to-[#17143f]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">World Hackathon Championship · 2026</p>
          <div className="mt-5 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Live matches</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80">
                Follow matches happening now, see what is starting next, and check the latest winners. Each division match runs for six hours.
              </p>
            </div>
            <a href="/championship" className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-50 hover:bg-cyan-200/20">
              Full match calendar <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <label className="mt-8 block max-w-lg">
            <span className="sr-only">Search by country, division, or group</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search country, division, or group"
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
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-blue-100">{matches.live.length}</span>
              </div>
              {matches.live.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matches.live.map((match) => <MatchCard key={match.id} match={match} now={now} />)}
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
                  {matches.upcoming.map((match) => <MatchCard key={match.id} match={match} now={now} />)}
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
              </div>
              {matches.completed.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matches.completed.map((match) => <MatchCard key={match.id} match={match} now={now} />)}
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
