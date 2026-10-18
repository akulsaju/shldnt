import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { Flag } from '@/lib/country-flags'
import {
  divisionMatches,
  resultForDivisionMatch,
} from '@/lib/championship-results'
import {
  formatLocalDate,
  formatLocalTime,
  regionTimeZone,
} from '@/lib/championship-fixtures'

export const dynamic = 'force-dynamic'

type MatchNewsPageProps = {
  params: Promise<{ matchId: string }>
}

function completedMatch(matchId: string) {
  const match = divisionMatches.find((candidate) => candidate.id === matchId)
  if (!match || match.endsAt > Date.now()) return null
  return { match, result: resultForDivisionMatch(match) }
}

export async function generateMetadata({ params }: MatchNewsPageProps): Promise<Metadata> {
  const { matchId } = await params
  const completed = completedMatch(matchId)
  if (!completed) return { title: 'Match report' }

  const { match, result } = completed
  const opponent = result.winner === match.fixture.home ? match.fixture.away : match.fixture.home
  const title = `${result.winner} wins against ${opponent}`
  return {
    title,
    description: `${result.winner} won the ${match.division.label} championship match against ${opponent}.`,
    alternates: { canonical: `/news/matches/${match.id}` },
  }
}

export default async function MatchNewsPage({ params }: MatchNewsPageProps) {
  const { matchId } = await params
  const completed = completedMatch(matchId)
  if (!completed) notFound()

  const { match, result } = completed
  const { fixture, division } = match
  const opponent = result.winner === fixture.home ? fixture.away : fixture.home
  const timeZone = regionTimeZone(result.winner)
  const start = new Date(match.startsAt)

  return (
    <main className="modern-shell min-h-screen text-[#0b192c]">
      <div className="sticky top-0 z-50 bg-[#071426] shadow-xl shadow-blue-950/30">
        <SiteHeader label="Back to news" href="/news" />
      </div>

      <section className="hero-grid relative overflow-hidden text-white">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-24">
          <a href="/news" className="relative z-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100 hover:text-white">
            <ArrowLeft size={14} aria-hidden="true" /> All news
          </a>
          <div className="relative z-10 mt-12 max-w-4xl">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
              <Trophy size={14} aria-hidden="true" /> Championship match report · {division.label}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">{result.winner} wins against {opponent}.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">
              {result.winner} won the {division.label} match against {opponent} in Group {fixture.group}.
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-blue-900/10">
          <div className="grid gap-5 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-6 sm:grid-cols-2 sm:p-10 lg:p-14">
            <div className="rounded-3xl border border-cyan-100 bg-white/80 p-7 text-center shadow-sm">
              <div className="flex flex-wrap items-center justify-center gap-5">
                <div>
                  <Flag country={result.winner} className="mx-auto h-12 w-20 rounded object-cover shadow-sm" />
                  <p className="mt-3 text-sm font-bold text-[#102d59]">{result.winner}</p>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">won</span>
                <div>
                  <Flag country={opponent} className="mx-auto h-12 w-20 rounded object-cover shadow-sm" />
                  <p className="mt-3 text-sm font-bold text-[#102d59]">{opponent}</p>
                </div>
              </div>
              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">Match winner</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm">
                <CalendarDays size={18} className="text-[#3b5da8]" aria-hidden="true" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#3b5da8]">Date</p>
                <p className="mt-1 text-sm text-slate-600">{formatLocalDate(start, timeZone)}</p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm">
                <Clock3 size={18} className="text-[#3b5da8]" aria-hidden="true" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#3b5da8]">Match time</p>
                <p className="mt-1 text-sm text-slate-600">{formatLocalTime(start, timeZone)} · {timeZone}</p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm sm:col-span-2">
                <Trophy size={18} className="text-[#3b5da8]" aria-hidden="true" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#3b5da8]">Fixture</p>
                <p className="mt-1 text-sm text-slate-600">{fixture.home} vs {fixture.away} · Group {fixture.group}</p>
              </div>
            </div>
          </div>
          <div className="prose prose-slate max-w-none p-6 sm:p-10 lg:p-14">
            <p className="lead text-xl leading-9 text-slate-700">
              {result.winner} secured the win in the {division.label} championship match against {opponent}.
            </p>
            <p>
              The six-hour match brought the two national teams together for a full session of technical challenge,
              coordination, and problem-solving. The result is now recorded in the championship fixtures.
            </p>
            <p>The World Hackathon Federation congratulates {result.winner} and thanks both teams for taking part.</p>
          </div>
        </div>
        <a href="/news" className="mt-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]">
          <ArrowLeft size={14} aria-hidden="true" /> Back to all news
        </a>
      </article>
    </main>
  )
}
