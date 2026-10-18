'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, Clock3, Trophy } from 'lucide-react'
import { Flag } from '@/lib/country-flags'
import {
  countdownParts,
  divisionMatches,
  resultForDivisionMatch,
  type DivisionMatch,
} from '@/lib/championship-results'
import {
  formatLocalDate,
  formatLocalTime,
  regionTimeZone,
} from '@/lib/championship-fixtures'

function MatchStatus({ match, now }: { match: DivisionMatch; now: number | null }) {
  if (now === null) return <span className="text-xs text-slate-500">Checking match status…</span>
  if (match.startsAt <= now && now < match.endsAt) {
    return <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700"><Clock3 size={13} />Live · results in {countdownParts(match.endsAt - now)}</span>
  }
  if (match.endsAt <= now) {
    const result = resultForDivisionMatch(match)
    return <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800"><Trophy size={13} />{result.winner} won</span>
  }
  return <span className="text-xs text-slate-500">Starts in {countdownParts(match.startsAt - now)}</span>
}

export function CountryChampionshipResults({ country }: { country: string }) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const matches = divisionMatches
    .filter(({ fixture }) => fixture.home === country || fixture.away === country)
    .sort((left, right) => left.startsAt - right.startsAt)

  return (
    <section className="mt-10 rounded-2xl border border-[#d8e3f2] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#4266b3]">Championship qualifiers</p>
          <h2 className="mt-2 text-2xl font-semibold">Fixtures & results</h2>
        </div>
        <p className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={15} /> {matches.length} division matches</p>
      </div>
      {matches.length > 0 ? (
        <ul className="mt-5 divide-y divide-slate-100">
          {matches.map((match) => {
            const { fixture, division } = match
            const timeZone = regionTimeZone(country)
            const opponent = fixture.home === country ? fixture.away : fixture.home
            const date = new Date(match.startsAt)
            return (
              <li key={match.id} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#10233f]">
                    <Flag country={opponent} className="h-5 w-8 rounded object-cover" />
                    {division.label} vs {opponent}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Group {fixture.group} · {formatLocalDate(date, timeZone)} · {formatLocalTime(date, timeZone)} ({timeZone})
                  </p>
                </div>
                <div className="sm:text-right"><MatchStatus match={match} now={now} /></div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-slate-500">No championship fixtures are listed for this country.</p>
      )}
    </section>
  )
}
