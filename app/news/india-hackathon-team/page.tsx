import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { directoryParticipantNames } from '@/lib/participant-names'

const team = directoryParticipantNames.India.slice(0, 6)

export const metadata: Metadata = {
  title: 'Meet Team India',
  description: 'Meet the builders representing India in the World Hackathon Championship qualifiers.',
  alternates: { canonical: '/news/india-hackathon-team' },
  openGraph: {
    title: 'Meet Team India | World Hackathon Federation',
    description: 'Meet the builders representing India in the World Hackathon Championship qualifiers.',
    url: '/news/india-hackathon-team',
    images: [{ url: '/news/india-team.png', width: 515, height: 387, alt: 'Team India posing together with the Indian flag' }],
  },
}

export default function IndiaHackathonTeamPage() {
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
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">India National Team · October 2026</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">Team India gets ready for the global stage.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">
              Builders representing India come together beneath the tricolour ahead of the World Hackathon Championship qualifiers.
            </p>
          </div>
        </div>
      </section>
      <article className="mx-auto max-w-5xl px-5 py-12 sm:py-16 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-blue-900/10">
          <img
            src="/news/india-team.png"
            alt="Team India members posing together with the Indian flag at a hackathon"
            className="h-auto max-h-[680px] w-full object-cover object-center"
          />
          <div className="grid gap-4 border-b border-blue-100/80 bg-white/60 p-5 sm:grid-cols-3 sm:p-7">
            <div className="flex items-center gap-3">
              <CalendarDays size={17} className="shrink-0 text-[#3b5da8]" aria-hidden="true" />
              <span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Competition</strong><span className="text-sm text-slate-600">World Hackathon Championship 2026</span></span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={17} className="shrink-0 text-[#3b5da8]" aria-hidden="true" />
              <span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Representing</strong><span className="text-sm text-slate-600">India</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={17} className="shrink-0 text-[#3b5da8]" aria-hidden="true" />
              <span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Team pictured</strong><span className="text-sm text-slate-600">6 participants</span></span>
            </div>
          </div>
          <div className="prose prose-slate max-w-none p-6 sm:p-10 lg:p-14">
            <p className="lead text-xl leading-9 text-slate-700">
              Team India is pictured together at a hackathon, with the national flag at the centre of the group. The photo captures the collaboration and shared excitement of builders preparing to represent their country.
            </p>
            <h2>Meet Team India</h2>
            <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
              {team.map((name) => (
                <div key={name} className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm">
                  <p className="font-semibold text-[#102d59]">{name}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#3b5da8]">India directory</p>
                </div>
              ))}
            </div>
            <h2>India on the championship stage</h2>
            <p>
              India is part of the World Hackathon Championship qualifying schedule. Teams compete in six-hour hackathons across the Under-19, Under-25, and Under-40 divisions. Follow the live matches page for fixtures as they happen and results after each match ends.
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
          <a href="/members/india" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]">
            India association <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </article>
      <footer className="bg-[#071426] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl text-sm text-blue-100/60">World Hackathon Federation · Newsroom</div>
      </footer>
    </main>
  )
}
