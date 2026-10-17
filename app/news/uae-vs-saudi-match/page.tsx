import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

const teams = {
  UAE: [
    ['Akul Saju', 'Under-19'],
    ['Saiqua Kazimi', 'Under-19'],
  ],
  'Saudi Arabia': [
    ['Mohammed Al-Ghamdi', 'Under-19'],
    ['Sarah Al-Otaibi', 'Under-19'],
  ],
} as const

export const metadata: Metadata = {
  title: 'UAE Defeats Saudi Arabia',
  description: 'The United Arab Emirates defeated Saudi Arabia in the October 16 match.',
  alternates: { canonical: '/news/uae-vs-saudi-match' },
  openGraph: {
    title: 'UAE Defeats Saudi Arabia | World Hackathon Federation',
    description: 'The United Arab Emirates defeated Saudi Arabia in the October 16 match.',
    url: '/news/uae-vs-saudi-match',
    images: [{ url: '/favicon.jpg', width: 600, height: 600, alt: 'World Hackathon Federation logo' }],
  },
}

export default function UaeVsSaudiMatchPage() {
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
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">Match Report · October 16, 2026</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">UAE defeats Saudi Arabia in a hard-fought match.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">The United Arab Emirates secured the win in a match that ran from 8:30 AM to 2:30 PM UAE time.</p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-blue-900/10">
          <div className="grid gap-5 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-6 sm:grid-cols-2 sm:p-10 lg:p-14">
            <div className="rounded-3xl border border-cyan-100 bg-white/80 p-7 text-center shadow-sm">
              <div className="flex items-center justify-center gap-5">
                <div><img src="/country-flags-main/svg/ae.svg" alt="United Arab Emirates flag" className="mx-auto h-12 w-20 rounded object-cover shadow-sm" /><p className="mt-3 text-sm font-bold text-[#102d59]">UAE</p></div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#3b5da8]">won</span>
                <div><img src="/country-flags-main/svg/sa.svg" alt="Saudi Arabia flag" className="mx-auto h-12 w-20 rounded object-cover shadow-sm" /><p className="mt-3 text-sm font-bold text-[#102d59]">Saudi Arabia</p></div>
              </div>
              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">Final result</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm"><CalendarDays size={18} className="text-[#3b5da8]" aria-hidden="true" /><p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#3b5da8]">Date</p><p className="mt-1 text-sm text-slate-600">October 16, 2026</p></div>
              <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm"><Clock3 size={18} className="text-[#3b5da8]" aria-hidden="true" /><p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#3b5da8]">Match time</p><p className="mt-1 text-sm text-slate-600">8:30 AM - 2:30 PM UAE time</p></div>
              <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm sm:col-span-2"><MapPin size={18} className="text-[#3b5da8]" aria-hidden="true" /><p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#3b5da8]">Fixture</p><p className="mt-1 text-sm text-slate-600">United Arab Emirates vs Saudi Arabia</p></div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none p-6 sm:p-10 lg:p-14">
            <p className="lead text-xl leading-9 text-slate-700">The United Arab Emirates defeated Saudi Arabia in the October 16 match, earning a strong result for the UAE side on the regional stage.</p>
            <p>The match began at 8:30 AM and concluded at 2:30 PM UAE time. Both teams competed through a full day of technical challenge, coordination, and problem-solving before the UAE was confirmed as the winner.</p>
            <h2>A result for the UAE community</h2>
            <p>The victory is a proud moment for the UAE hackathon community and its supporters. It reflects the preparation, teamwork, and competitive spirit that participants bring to federation events.</p>
            <h2>Meet the teams</h2>
            <p>The match was contested by the Under-19 teams of both nations, with two participants from the federation directory representing each side.</p>
            <div className="not-prose my-8 grid gap-5 md:grid-cols-2">
              {Object.entries(teams).map(([country, members]) => (
                <div key={country} className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#102d59]">{country}</h3>
                  <div className="mt-4 space-y-2">
                    {members.map(([name, division]) => <div key={name} className="flex items-center justify-between gap-3 border-b border-blue-50 pb-2 text-sm last:border-0 last:pb-0"><span className="font-medium text-slate-700">{name}</span><span className="shrink-0 text-[9px] font-black uppercase tracking-[0.12em] text-[#3b5da8]">{division}</span></div>)}
                  </div>
                </div>
              ))}
            </div>
            <p>The World Hackathon Federation congratulates the UAE team and thanks both teams for contributing to a memorable match.</p>
          </div>
        </div>
        <div className="mt-10 flex justify-between gap-4">
          <a href="/news" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]"><ArrowLeft size={14} aria-hidden="true" /> Back to all news</a>
          <a href="/members" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]">Member nations <ArrowRight size={14} aria-hidden="true" /></a>
        </div>
      </article>

      <footer className="bg-[#071426] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl text-sm text-blue-100/60">World Hackathon Federation · Newsroom</div>
      </footer>
    </main>
  )
}
