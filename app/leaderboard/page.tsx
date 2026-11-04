import type { Metadata } from 'next'
import { AlertTriangle, ArrowRight, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { disqualifiedCountries } from '@/lib/championship-fixtures'

export const metadata: Metadata = {
  title: 'Championship Leaderboard',
  description: 'Provisional division placements for the World Hackathon Championship 2026.',
  alternates: { canonical: '/leaderboard' },
}

const uaePlacements = [
  { division: 'Under-25', place: 15 },
  { division: 'Under-40', place: 13 },
]

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#10233f]">
      <SiteHeader label="NHA Portal" />
      <section className="bg-[#071426] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">World Hackathon Championship · 2026</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Division leaderboard</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80">
                Provisional placements for the UAE across the Under-25 and Under-40 divisions.
              </p>
            </div>
            <a href="/championship" className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-50 hover:bg-cyan-200/20">
              Championship fixtures <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-5 py-10 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
            <Trophy size={18} className="text-[#315d93]" aria-hidden="true" />
            <h2 className="text-sm font-bold">United Arab Emirates · provisional standings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  <th scope="col" className="px-5 py-4">Place</th>
                  <th scope="col" className="px-5 py-4">Country</th>
                  <th scope="col" className="px-5 py-4">Division</th>
                  <th scope="col" className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {uaePlacements.map(({ division, place }) => (
                  <tr key={division} className="border-b border-slate-100 last:border-0">
                    <td className="px-5 py-4">
                      <span className="inline-flex min-w-12 justify-center rounded-full bg-cyan-100 px-3 py-1 text-sm font-extrabold tabular-nums text-cyan-950">
                        {place}<sup className="ml-0.5 text-[9px]">th</sup>
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#102d59]">United Arab Emirates</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{division}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-950">Provisional</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-slate-100 px-5 py-4 text-xs leading-5 text-slate-500">
            Placements are provisional while qualifying fixtures are in progress.
          </p>
        </div>

        <div role="status" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-950">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <AlertTriangle size={17} aria-hidden="true" /> Disqualified · excluded from standings
          </h2>
          <p className="mt-2 text-sm leading-6">
            {Array.from(disqualifiedCountries).join(' and ')} have been removed from active championship fixtures and results and are not ranked.
          </p>
        </div>
      </section>
    </main>
  )
}
