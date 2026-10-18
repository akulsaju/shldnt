'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Search, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { Flag } from '@/lib/country-flags'
import { under19PlayersForCountry } from '@/lib/championship-rosters'
import {
  championshipFixtures,
  formatLocalDate,
  formatLocalTime,
  formatMatchDate,
  localEndTime,
  localStartTime,
  regionTimeZone,
} from '@/lib/championship-fixtures'

const firstFixtureDate = '2026-10-16'
const finalFixtureDate = '2026-11-19'
const selectionDate = '2026-11-20'

function dateKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
}

function getMonthDays(month: Date) {
  const first = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1))
  const mondayOffset = (first.getUTCDay() + 6) % 7
  const start = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1 - mondayOffset))
  return Array.from({ length: 42 }, (_, index) => new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + index)))
}

function TeamLine({ country }: { country: string }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <Flag country={country} className="h-6 w-9 shrink-0 rounded object-cover shadow-sm" />
      <span className="truncate text-sm font-semibold text-white">{country}</span>
    </span>
  )
}

function FixtureCard({ fixture }: { fixture: (typeof championshipFixtures)[number] }) {
  const start = localStartTime(fixture)
  const end = localEndTime(fixture)
  const opponentTimeZone = regionTimeZone(fixture.away)

  return (
    <article className="rounded-2xl border border-white/15 bg-[#102d59] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d67]">
          Group {fixture.group}
        </span>
        {fixture.result ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800">
            {fixture.result}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-blue-100/70">
            <Clock3 size={14} aria-hidden="true" /> 6-hour match
          </span>
        )}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <TeamLine country={fixture.home} />
        <span className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">vs</span>
        <TeamLine country={fixture.away} />
      </div>
      <div className="mt-5 grid gap-3 border-t border-white/20 pt-4 text-xs sm:grid-cols-2">
        <div>
          <p className="font-semibold text-white">{fixture.home} regional time</p>
          <p className="mt-1 text-blue-100/75">
            {formatLocalDate(start, fixture.timeZone)} · {formatLocalTime(start, fixture.timeZone)} – {formatLocalTime(end, fixture.timeZone)}
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">{fixture.away} regional time</p>
          <p className="mt-1 text-blue-100/75">
            {formatLocalDate(start, opponentTimeZone)} · {formatLocalTime(start, opponentTimeZone)} – {formatLocalTime(end, opponentTimeZone)}
          </p>
        </div>
      </div>
      <details className="group mt-5 border-t border-white/20 pt-4">
        <summary className="cursor-pointer list-none text-xs font-semibold text-cyan-200 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
          <span className="group-open:hidden">View U-19 team players</span>
          <span className="hidden group-open:inline">Hide U-19 team players</span>
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[fixture.home, fixture.away].map((country) => {
            const players = under19PlayersForCountry(country)
            return (
              <section key={country} aria-label={`${country} Under-19 team`} className="rounded-xl border border-white/15 bg-[#071f40]/70 p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-white">
                  <Flag country={country} className="h-4 w-6 rounded object-cover" />
                  {country} · Under-19
                </h3>
                {players.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-blue-50">
                    {players.map((player) => <li key={player}>{player}</li>)}
                  </ul>
                ) : (
                  <p className="mt-3 text-xs text-blue-100/70">U-19 roster not published yet.</p>
                )}
              </section>
            )
          })}
        </div>
      </details>
    </article>
  )
}

export default function ChampionshipPage() {
  const [selectedDate, setSelectedDate] = useState('2026-10-18')
  const [visibleMonth, setVisibleMonth] = useState(new Date(Date.UTC(2026, 9, 1)))
  const [countrySearch, setCountrySearch] = useState('')

  const fixturesByDate = useMemo(() => {
    const grouped = new Map<string, typeof championshipFixtures>()
    championshipFixtures.forEach((fixture) => {
      grouped.set(fixture.date, [...(grouped.get(fixture.date) ?? []), fixture])
    })
    return grouped
  }, [])
  const matchDates = useMemo(() => [...fixturesByDate.keys()].sort(), [fixturesByDate])
  const selectedFixtures = (fixturesByDate.get(selectedDate) ?? []).filter((fixture) => (
    `${fixture.home} ${fixture.away} ${fixture.group}`.toLowerCase().includes(countrySearch.trim().toLowerCase())
  ))
  const calendarDays = getMonthDays(visibleMonth)

  function chooseDate(date: string) {
    setSelectedDate(date)
    const [year, month] = date.split('-').map(Number)
    setVisibleMonth(new Date(Date.UTC(year, month - 1, 1)))
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#10233f]">
      <SiteHeader label="NHA Portal" />
      <section className="relative overflow-hidden bg-[#071426] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">World Hackathon Championship · Qualifiers 2026</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-6xl">Every country. One route to the Top 64.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80 sm:text-lg">
                Browse qualifying fixtures with country flags and regional local times. Three staggered start windows spread matches through each match day; every hackathon runs for six hours.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:min-w-[300px]">
              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4"><p className="text-3xl font-semibold">191</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/65">Countries</p></div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4"><p className="text-3xl font-semibold">{championshipFixtures.length}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/65">Qualifying matches</p></div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-cyan-200/20 bg-cyan-100/[0.08] px-4 py-3 text-sm text-cyan-50">
            <Trophy size={17} aria-hidden="true" />
            <span>Top 64 teams announced November 20, 2026</span>
            <span className="hidden text-cyan-100/50 sm:inline">·</span>
            <span>UAE beat Saudi Arabia on October 16</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[360px_1fr] lg:px-8 lg:py-14">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#315d93]" aria-hidden="true" />
              <h2 className="text-sm font-bold">Match calendar</h2>
            </div>
            <div className="flex gap-1">
              <button type="button" aria-label="Previous month" onClick={() => setVisibleMonth(new Date(Date.UTC(visibleMonth.getUTCFullYear(), visibleMonth.getUTCMonth() - 1, 1)))} className="grid size-8 place-items-center rounded-full hover:bg-slate-100"><ArrowLeft size={15} /></button>
              <button type="button" aria-label="Next month" onClick={() => setVisibleMonth(new Date(Date.UTC(visibleMonth.getUTCFullYear(), visibleMonth.getUTCMonth() + 1, 1)))} className="grid size-8 place-items-center rounded-full hover:bg-slate-100"><ArrowRight size={15} /></button>
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold">
            {new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(visibleMonth)}
          </p>
          <div className="mt-4 grid grid-cols-7 text-center text-[10px] font-bold uppercase text-slate-400">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={`${day}-${index}`} className="py-2">{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((date) => {
              const key = dateKey(date)
              const isVisibleMonth = date.getUTCMonth() === visibleMonth.getUTCMonth()
              const isMatchDay = fixturesByDate.has(key)
              const isDeadline = key === selectionDate
              const inCompetitionRange = key >= firstFixtureDate && key <= selectionDate
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!inCompetitionRange}
                  onClick={() => chooseDate(key)}
                  aria-label={`${formatMatchDate(key)}${isMatchDay ? `, ${fixturesByDate.get(key)?.length} matches` : isDeadline ? ', Top 64 selection' : ''}`}
                  className={`relative grid aspect-square place-items-center rounded-xl text-sm transition ${
                    !isVisibleMonth ? 'text-slate-300' : ''
                  } ${selectedDate === key ? 'bg-[#102d59] font-bold text-white' : isDeadline ? 'bg-emerald-50 font-bold text-emerald-800' : isMatchDay ? 'bg-cyan-50 font-semibold text-[#174b76] hover:bg-cyan-100' : 'text-slate-400'} disabled:cursor-default`}
                >
                  {date.getUTCDate()}
                  {isMatchDay && selectedDate !== key && <span className="absolute bottom-1 size-1 rounded-full bg-cyan-600" />}
                  {isDeadline && <span className="absolute bottom-1 size-1 rounded-full bg-emerald-600" />}
                </button>
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-cyan-600" /> Match day</span>
            <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-emerald-600" /> Top 64 selection</span>
          </div>
          <button type="button" onClick={() => chooseDate(selectionDate)} className="mt-4 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left text-xs font-semibold text-emerald-900 hover:bg-emerald-100">
            November 20 · Top 64 selected
          </button>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4266b3]">Fixtures</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{formatMatchDate(selectedDate)}</h2>
              <p className="mt-2 text-sm text-slate-500">
                {selectedDate === selectionDate
                  ? 'Top 64 qualification is confirmed today.'
                  : `${selectedFixtures.length} match${selectedFixtures.length === 1 ? '' : 'es'} scheduled · six hours each`}
              </p>
            </div>
            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 sm:w-72">
              <Search size={16} aria-hidden="true" />
              <input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Filter by country or group" className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" />
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {matchDates.map((date) => (
              <button key={date} type="button" onClick={() => chooseDate(date)} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold ${selectedDate === date ? 'border-[#102d59] bg-[#102d59] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-500'}`}>
                {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))}
              </button>
            ))}
            <button type="button" onClick={() => chooseDate(selectionDate)} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold ${selectedDate === selectionDate ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
              Nov 20 · Selection
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {selectedFixtures.map((fixture) => <FixtureCard key={fixture.id} fixture={fixture} />)}
            {selectedFixtures.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="font-semibold text-slate-700">{selectedDate === selectionDate ? 'The 64 qualifiers are selected' : 'No matching fixtures'}</p>
                <p className="mt-2 text-sm text-slate-500">{selectedDate === selectionDate ? 'The Top 64 qualification announcement is scheduled for November 20, 2026.' : 'Choose another calendar date or change your country search.'}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-xs text-slate-500">
        Provisional shuffled qualifying draw · Times are shown in each country’s regional reference time zone · Top 64 selected November 20, 2026
      </footer>
    </main>
  )
}
