'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { Flag } from '@/lib/country-flags'
import {
  championshipStandings,
  divisionMatches,
} from '@/lib/championship-results'
import { championshipDivisions } from '@/lib/championship-rosters'

type LeaderboardKey = 'overall' | (typeof championshipDivisions)[number]['key']

export default function LeaderboardPage() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<LeaderboardKey>('overall')
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const interval = window.setInterval(update, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  const standings = useMemo(
    () => now === null
      ? []
      : championshipStandings(now, selectedLeaderboard === 'overall' ? undefined : selectedLeaderboard),
    [now, selectedLeaderboard],
  )
  const completedMatches = now === null
    ? 0
    : divisionMatches.filter((match) => match.endsAt <= now
      && (selectedLeaderboard === 'overall' || match.division.key === selectedLeaderboard)).length
  const selectedLabel = selectedLeaderboard === 'overall'
    ? 'Overall'
    : championshipDivisions.find(({ key }) => key === selectedLeaderboard)?.label ?? 'Overall'

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#10233f]">
      <SiteHeader label="NHA Portal" />
      <section className="bg-[#071426] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18 lg:px-8">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">
            <Trophy size={14} aria-hidden="true" />
            World Hackathon Championship · Qualifiers 2026
          </p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Championship leaderboard</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80">
                Standings are calculated from completed match scores. Upcoming and live matches do not count until results are released.
              </p>
            </div>
            <a href="/championship" className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-50 hover:bg-cyan-200/20">
              Match calendar <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Completed matches</p>
            <p className="mt-2 text-3xl font-semibold">{now === null ? '—' : completedMatches}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Countries ranked</p>
            <p className="mt-2 text-3xl font-semibold">{now === null ? '—' : standings.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Standings</p>
            <p className="mt-2 text-3xl font-semibold">{selectedLabel}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Leaderboard category">
          <button
            type="button"
            aria-pressed={selectedLeaderboard === 'overall'}
            onClick={() => setSelectedLeaderboard('overall')}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${selectedLeaderboard === 'overall' ? 'border-[#102d59] bg-[#102d59] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-600'}`}
          >
            Overall
          </button>
          {championshipDivisions.map((division) => (
            <button
              key={division.key}
              type="button"
              aria-pressed={selectedLeaderboard === division.key}
              onClick={() => setSelectedLeaderboard(division.key)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${selectedLeaderboard === division.key ? 'border-[#102d59] bg-[#102d59] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-600'}`}
            >
              {division.label}
            </button>
          ))}
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl font-semibold">{selectedLabel} standings</h2>
              <p className="mt-1 text-xs text-slate-500">Ranked by standings points, score difference, score scored, then wins.</p>
            </div>
            <p className="text-xs text-slate-500">Win: 3 pts · Draw: 1 pt · Loss: 0 pts</p>
          </div>

          {now === null ? (
            <p role="status" className="px-6 py-10 text-center text-sm text-slate-500">Loading results…</p>
          ) : standings.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-slate-500">No completed matches in this leaderboard yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <caption className="sr-only">{selectedLabel} championship standings based on completed match results</caption>
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-center">#</th>
                    <th scope="col" className="px-3 py-3">Country</th>
                    <th scope="col" className="px-3 py-3 text-center">P</th>
                    <th scope="col" className="px-3 py-3 text-center">W</th>
                    <th scope="col" className="px-3 py-3 text-center">D</th>
                    <th scope="col" className="px-3 py-3 text-center">L</th>
                    <th scope="col" className="px-3 py-3 text-center">PF</th>
                    <th scope="col" className="px-3 py-3 text-center">PA</th>
                    <th scope="col" className="px-3 py-3 text-center">Diff</th>
                    <th scope="col" className="px-5 py-3 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {standings.map((standing, index) => (
                    <tr key={standing.country} className={index === 0 ? 'bg-amber-50/50' : 'hover:bg-slate-50'}>
                      <td className="px-5 py-4 text-center font-semibold text-slate-500">{index + 1}</td>
                      <th scope="row" className="px-3 py-4 font-semibold text-[#10233f]">
                        <span className="flex items-center gap-3">
                          <Flag country={standing.country} className="h-5 w-8 shrink-0 rounded object-cover shadow-sm" />
                          {standing.country}
                        </span>
                      </th>
                      <td className="px-3 py-4 text-center">{standing.played}</td>
                      <td className="px-3 py-4 text-center">{standing.wins}</td>
                      <td className="px-3 py-4 text-center">{standing.draws}</td>
                      <td className="px-3 py-4 text-center">{standing.losses}</td>
                      <td className="px-3 py-4 text-center">{standing.pointsFor}</td>
                      <td className="px-3 py-4 text-center">{standing.pointsAgainst}</td>
                      <td className="px-3 py-4 text-center">{standing.pointsFor - standing.pointsAgainst}</td>
                      <td className="px-5 py-4 text-right font-bold text-[#174b76]">{standing.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Overall standings combine all completed Under-19, Under-25, and Under-40 matches. PF and PA are match scores for and against; the overall WHF world ranking is a separate system.
        </p>
      </section>
    </main>
  )
}
