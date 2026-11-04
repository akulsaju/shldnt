'use client'

import { Fragment, useMemo, useState } from 'react'
import { AlertTriangle, ArrowUpRight, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { DeveloperLinks } from '@/components/developer-links'
import { SystemStatus } from '@/components/system-status'
import { Flag } from '@/lib/country-flags'
import {
  championshipStandings,
  countdownParts,
  divisionMatches,
  formatRelativeAge,
  inPlayByCountry,
  lastLedgerWriteAt,
  matchStatus,
  recentForms,
  shortHash,
  type FormResult,
} from '@/lib/championship-results'
import { siteConfig } from '@/lib/site-config'
import {
  championshipDivisions,
  type ChampionshipDivision,
} from '@/lib/championship-rosters'
import { disqualifiedCountries } from '@/lib/championship-fixtures'
import { teamCode } from '@/lib/team-codes'
import { useNow } from '@/lib/use-now'

type LeaderboardKey = 'overall' | ChampionshipDivision['key']

const SYNC_INTERVAL_MS = 60_000
const DAY_MS = 24 * 60 * 60 * 1000
const FINAL_PHASE_CUT = 64

const uaePlacements = [
  { division: 'Under-25', place: 15 },
  { division: 'Under-40', place: 13 },
]

const formStyles: Record<FormResult, string> = {
  W: 'bg-emerald-400 text-[#04261a]',
  D: 'bg-white/25 text-white',
  L: 'bg-rose-500/25 text-rose-200',
}

function Movement({ delta }: { delta: number | null }) {
  if (delta === null) return <span className="font-mono text-[9px] font-bold text-cyan-300">NEW</span>
  if (delta === 0) return <span className="font-mono text-[10px] text-blue-100/30">—</span>
  return delta > 0
    ? <span className="font-mono text-[10px] font-bold text-emerald-300">▲{delta}</span>
    : <span className="font-mono text-[10px] font-bold text-rose-300">▼{Math.abs(delta)}</span>
}

function Form({ results }: { results: FormResult[] }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Last ${results.length}: ${results.join(' ')}`}>
      {Array.from({ length: 5 - results.length }, (_, index) => (
        <span key={`pad-${index}`} className="size-4 rounded-[3px] bg-white/5" aria-hidden="true" />
      ))}
      {results.map((result, index) => (
        <span key={index} className={`grid size-4 place-items-center rounded-[3px] font-mono text-[9px] font-bold ${formStyles[result]}`} aria-hidden="true">
          {result}
        </span>
      ))}
    </span>
  )
}

export default function LeaderboardPage() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<LeaderboardKey>('overall')
  const now = useNow(1000)
  const syncedAt = now === null ? null : Math.floor(now / SYNC_INTERVAL_MS) * SYNC_INTERVAL_MS
  const divisionKey = selectedLeaderboard === 'overall' ? undefined : selectedLeaderboard

  const ledger = useMemo(() => {
    if (syncedAt === null) return null
    const standings = championshipStandings(syncedAt, divisionKey)
    const previousRanks = new Map(championshipStandings(syncedAt - DAY_MS, divisionKey).map(({ country }, index) => [country, index + 1]))
    const digest = shortHash(standings.map((row) => `${row.country}:${row.points}:${row.pointsFor}:${row.pointsAgainst}`).join('|'), 16)
    return {
      standings,
      previousRanks,
      digest,
      forms: recentForms(syncedAt, divisionKey),
      inPlay: inPlayByCountry(syncedAt, divisionKey),
      lastWrite: lastLedgerWriteAt(syncedAt),
    }
  }, [syncedAt, divisionKey])

  const scopedMatches = divisionMatches.filter((match) => !divisionKey || match.division.key === divisionKey)
  const statuses = now === null ? [] : scopedMatches.map((match) => matchStatus(match, now))
  const completedMatches = statuses.filter((status) => status === 'complete').length
  const inPlayMatches = statuses.filter((status) => status === 'live' || status === 'delayed').length
  const heldMatches = statuses.filter((status) => status === 'delayed').length
  const standings = ledger?.standings ?? []
  const selectedLabel = selectedLeaderboard === 'overall'
    ? 'Overall'
    : championshipDivisions.find(({ key }) => key === selectedLeaderboard)?.label ?? 'Overall'
  const updatedLabel = now === null || !ledger?.lastWrite ? 'Syncing' : `Updated ${formatRelativeAge(now - ledger.lastWrite)}`
  const nextSync = now === null || syncedAt === null ? null : countdownParts(syncedAt + SYNC_INTERVAL_MS - now).slice(3)

  return (
    <main className="min-h-screen bg-[#071426] text-white">
      <SiteHeader label="NHA Portal" />
      <section className="bg-[#071426] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18 lg:px-8">
          <SystemStatus />
          <p className="mt-6 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
            <Trophy size={14} aria-hidden="true" />
            WHC 2026 · qualifiers · {standings.length || '—'} ranked · cut at {FINAL_PHASE_CUT}
          </p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Championship leaderboard</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80">
                Standings = sum of committed division results. W 3 · D 1 · L 0, tie-broken by score difference, points for, then wins.
                Live matches and results on hold are excluded until the build window closes and the hold lifts.
              </p>
              <DeveloperLinks className="mt-6" />
            </div>
            <a href="/championship" className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-50 hover:bg-cyan-200/20">
              Match calendar <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-5 py-10 lg:px-8 lg:py-14">
        <section aria-labelledby="uae-provisional-heading" className="overflow-hidden rounded-2xl border">
          <div className="border-b border-white/10 bg-cyan-300/10 px-5 py-4">
            <h2 id="uae-provisional-heading" className="text-sm font-bold text-cyan-100">UAE · provisional placements</h2>
            <p className="mt-1 text-xs text-blue-100/60">Provisional placement markers; the table below is calculated from completed match scores.</p>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {uaePlacements.map(({ division, place }) => (
              <div key={division} className="flex items-center justify-between bg-[#0b2142]/70 px-5 py-4">
                <span className="text-sm font-semibold text-white">{division}</span>
                <span className="inline-flex items-baseline gap-1 rounded-full bg-cyan-300/15 px-3 py-1 font-mono text-sm font-extrabold tabular-nums text-cyan-100">
                  {place}<sup className="text-[9px]">th place</sup>
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/60">Results committed</p>
            <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-white">{now === null ? '—' : completedMatches}</p>
            <p className="mt-2 font-mono text-[10px] text-blue-100/45">*{updatedLabel} via WHF Ledger API</p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/60">Countries ranked</p>
            <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-white">{now === null ? '—' : standings.length}</p>
            <p className="mt-2 font-mono text-[10px] text-blue-100/45">*DQ entries excluded · Pts → Diff → PF → W</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border p-5">
            {heldMatches > 0 && <span className="absolute inset-x-0 top-0 h-0.5 animate-pulse bg-orange-400" aria-hidden="true" />}
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/60">Pending · in play</p>
            <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-white">{now === null ? '—' : inPlayMatches}</p>
            <p className={`mt-2 font-mono text-[10px] ${heldMatches ? 'text-orange-300' : 'text-blue-100/45'}`}>
              *{heldMatches ? `${heldMatches} on result hold · not yet counted` : 'Not counted until FT'}
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/60">Standings</p>
            <p className="mt-2 text-3xl font-semibold text-white">{selectedLabel}</p>
            <p className="mt-2 font-mono text-[10px] text-blue-100/45">*Deterministic replay · ledger {siteConfig.ledgerVersion}</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Leaderboard category">
          <button
            type="button"
            aria-pressed={selectedLeaderboard === 'overall'}
            onClick={() => setSelectedLeaderboard('overall')}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${selectedLeaderboard === 'overall' ? 'border-cyan-200 bg-cyan-200 text-[#071426]' : 'border-white/15 bg-white/5 text-blue-100 hover:border-cyan-300/60'}`}
          >
            Overall
          </button>
          {championshipDivisions.map((division) => (
            <button
              key={division.key}
              type="button"
              aria-pressed={selectedLeaderboard === division.key}
              onClick={() => setSelectedLeaderboard(division.key)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${selectedLeaderboard === division.key ? 'border-cyan-200 bg-cyan-200 text-[#071426]' : 'border-white/15 bg-white/5 text-blue-100 hover:border-cyan-300/60'}`}
            >
              {division.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border">
          <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl font-semibold text-white">{selectedLabel} standings</h2>
              <p className="mt-1 text-xs text-blue-100/60">Ranked by standings points, score difference, points for, then wins.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-blue-100/60">
              <span className="rounded border border-white/15 px-2 py-1">W 3 · D 1 · L 0</span>
              <span className="rounded border border-white/15 px-2 py-1">
                <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" aria-hidden="true" />
                next sync {nextSync ?? '--:--'}
              </span>
            </div>
          </div>

          {ledger === null ? (
            <p role="status" className="px-6 py-10 text-center text-sm text-blue-100/60">Loading results…</p>
          ) : standings.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-blue-100/60">No completed matches in this leaderboard yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left text-sm">
                <caption className="sr-only">{selectedLabel} championship standings based on completed match results</caption>
                <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-100/55">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">#</th>
                    <th scope="col" className="px-2 py-3 text-center" title="Rank change vs. 24 hours ago">Δ24h</th>
                    <th scope="col" className="px-3 py-3">Country</th>
                    <th scope="col" className="px-3 py-3 text-center">P</th>
                    <th scope="col" className="px-3 py-3 text-center">W</th>
                    <th scope="col" className="px-3 py-3 text-center">D</th>
                    <th scope="col" className="px-3 py-3 text-center">L</th>
                    <th scope="col" className="px-3 py-3 text-center">PF</th>
                    <th scope="col" className="px-3 py-3 text-center">PA</th>
                    <th scope="col" className="px-3 py-3 text-center">Diff</th>
                    <th scope="col" className="px-3 py-3">Form</th>
                    <th scope="col" className="px-5 py-3 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.07]">
                  {standings.map((standing, index) => {
                    const rank = index + 1
                    const previous = ledger.previousRanks.get(standing.country)
                    const diff = standing.pointsFor - standing.pointsAgainst
                    const pending = ledger.inPlay.get(standing.country)
                    const belowCut = selectedLeaderboard === 'overall' && rank > FINAL_PHASE_CUT
                    return (
                      <Fragment key={standing.country}>
                        {selectedLeaderboard === 'overall' && rank === FINAL_PHASE_CUT + 1 && (
                          <tr aria-hidden="true">
                            <td colSpan={12} className="border-y border-dashed border-cyan-300/50 bg-cyan-300/[0.06] px-5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-200">
                              ↑ Projected final-phase cut · top {FINAL_PHASE_CUT} (Art. 27)
                            </td>
                          </tr>
                        )}
                        <tr
                          className={`${standing.country === 'United Arab Emirates'
                            ? 'bg-cyan-300/10 font-medium'
                            : index === 0 ? 'bg-violet-400/10' : 'hover:bg-white/[0.04]'} ${belowCut ? 'text-blue-100/50' : 'text-blue-50'}`}
                        >
                          <td className="px-4 py-3 text-center font-mono font-semibold tabular-nums text-blue-100/50">{rank}</td>
                          <td className="px-2 py-3 text-center"><Movement delta={previous === undefined ? null : previous - rank} /></td>
                          <th scope="row" className="px-3 py-3 font-semibold text-white">
                            <span className="flex items-center gap-2.5">
                              <Flag country={standing.country} className={`h-5 w-8 shrink-0 rounded-[3px] object-cover shadow-sm ${belowCut ? 'opacity-70' : ''}`} />
                              <span className="w-9 shrink-0 font-mono text-xs font-black tracking-[0.04em]">{teamCode(standing.country)}</span>
                              <span className={`truncate font-medium ${belowCut ? 'text-blue-100/50' : 'text-blue-50'}`}>{standing.country}</span>
                              {pending && (
                                <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${pending === 'delayed' ? 'animate-pulse bg-orange-400/20 text-orange-200' : 'bg-emerald-400/15 text-emerald-200'}`}>
                                  {pending === 'delayed' ? 'hold' : 'live'}
                                </span>
                              )}
                            </span>
                          </th>
                          <td className="px-3 py-3 text-center tabular-nums">{standing.played}</td>
                          <td className="px-3 py-3 text-center tabular-nums">{standing.wins}</td>
                          <td className="px-3 py-3 text-center tabular-nums">{standing.draws}</td>
                          <td className="px-3 py-3 text-center tabular-nums">{standing.losses}</td>
                          <td className="px-3 py-3 text-center tabular-nums">{standing.pointsFor}</td>
                          <td className="px-3 py-3 text-center tabular-nums">{standing.pointsAgainst}</td>
                          <td className={`px-3 py-3 text-center font-mono tabular-nums ${diff > 0 ? 'text-emerald-300' : diff < 0 ? 'text-rose-300' : 'text-blue-100/40'}`}>
                            {diff > 0 ? `+${diff}` : diff}
                          </td>
                          <td className="px-3 py-3"><Form results={ledger.forms.get(standing.country) ?? []} /></td>
                          <td className="px-5 py-3 text-right font-mono text-base font-bold tabular-nums text-cyan-200">{standing.points}</td>
                        </tr>
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex flex-col gap-1 border-t border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-[10px] text-blue-100/45 sm:flex-row sm:justify-between sm:px-6">
            <span>*Source: WHF Ledger API {siteConfig.ledgerVersion} · {updatedLabel.toLowerCase()} · Δ = rank change vs. 24h ago · Form = last 5, oldest → newest</span>
            <span>digest sha256:{ledger?.digest ?? '…'}</span>
          </div>
        </div>
        <p className="text-xs leading-5 text-blue-100/55">
          Overall standings combine all completed Under-19, Under-25, and Under-40 matches. PF and PA are match scores for and against; the overall WHF world ranking is a separate system (Art. 18).
        </p>
        <div role="status" className="relative overflow-hidden rounded-2xl border p-5 text-rose-100">
          <span className="absolute inset-y-0 left-0 w-1 bg-rose-400/70" aria-hidden="true" />
          <h2 className="flex items-center gap-2 text-sm font-bold text-rose-200">
            <AlertTriangle size={17} aria-hidden="true" /> Disqualified · excluded from standings
          </h2>
          <p className="mt-2 text-sm leading-6">
            {Array.from(disqualifiedCountries).map((country) => `${country} (${teamCode(country)})`).join(' and ')} have been removed from active championship fixtures and results and are not ranked.
          </p>
        </div>
      </section>
    </main>
  )
}