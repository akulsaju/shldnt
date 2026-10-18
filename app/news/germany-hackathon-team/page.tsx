import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Meet Team Germany',
  description: 'A look at the six-member team representing Germany in the World Hackathon Championship qualifiers.',
  alternates: { canonical: '/news/germany-hackathon-team' },
  openGraph: {
    title: 'Meet Team Germany | World Hackathon Federation',
    description: 'A look at the six-member team representing Germany in the World Hackathon Championship qualifiers.',
    url: '/news/germany-hackathon-team',
    images: [{ url: '/news/germany-team.png', width: 334, height: 223, alt: 'The six members of Team Germany' }],
  },
}

export default function GermanyHackathonTeamPage() {
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
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">Germany National Team · October 2026</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">Meet the six-member team representing Germany.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">
              A team portrait captures Germany’s representatives as they prepare for the World Hackathon Championship qualifiers.
            </p>
          </div>
        </div>
      </section>
      <article className="mx-auto max-w-5xl px-5 py-12 sm:py-16 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-blue-900/10">
          <img
            src="/news/germany-team.png"
            alt="Six members of Team Germany posing together in front of a German flag"
            className="h-auto max-h-[680px] w-full object-cover object-center"
          />
          <div className="grid gap-4 border-b border-blue-100/80 bg-white/60 p-5 sm:grid-cols-3 sm:p-7">
            <div className="flex items-center gap-3">
              <CalendarDays size={17} className="shrink-0 text-[#3b5da8]" aria-hidden="true" />
              <span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Competition</strong><span className="text-sm text-slate-600">World Hackathon Championship 2026</span></span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={17} className="shrink-0 text-[#3b5da8]" aria-hidden="true" />
              <span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Representing</strong><span className="text-sm text-slate-600">Germany</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={17} className="shrink-0 text-[#3b5da8]" aria-hidden="true" />
              <span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Team pictured</strong><span className="text-sm text-slate-600">6 members</span></span>
            </div>
          </div>
          <div className="prose prose-slate max-w-none p-6 sm:p-10 lg:p-14">
            <p className="lead text-xl leading-9 text-slate-700">
              Team Germany is pictured together ahead of its World Hackathon Championship qualifying matches. The portrait shows six members standing together beneath the German flag.
            </p>
            <h2>Germany on the championship stage</h2>
            <p>
              Germany is part of the international qualifying schedule, where teams take on six-hour hackathons across the Under-19, Under-25, and Under-40 divisions. Follow the live matches page for current fixtures and published results.
            </p>
            <a href="/live-matches" className="not-prose inline-flex items-center gap-2 rounded-full bg-[#102d59] px-5 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-white hover:bg-[#163c78]">
              Follow live matches <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-4">
          <a href="/news" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]">
            <ArrowLeft size={14} aria-hidden="true" /> Back to all news
          </a>
          <a href="/members/germany" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]">
            Germany association <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </article>
      <footer className="bg-[#071426] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl text-sm text-blue-100/60">World Hackathon Federation · Newsroom</div>
      </footer>
    </main>
  )
}
