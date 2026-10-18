import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

const team = [
  ['Chloé Laurent', 'Under-19'],
  ['Lucas Dubois', 'Under-19'],
  ['Camille Bernard', 'Under-25'],
  ['Julien Moreau', 'Under-25'],
  ['Antoine Petit', 'Under-40'],
  ['Manon Roux', 'Under-40'],
]

export const metadata: Metadata = {
  title: 'France Hackathon Team',
  description: 'Meet the six innovators representing France across the World Hackathon Federation competition divisions.',
  alternates: { canonical: '/news/france-hackathon-team' },
  openGraph: {
    title: 'France Hackathon Team | World Hackathon Federation',
    description: 'Meet the six innovators representing France across the World Hackathon Federation competition divisions.',
    url: '/news/france-hackathon-team',
    images: ['/favicon.jpg'],
  },
}

export default function FranceHackathonTeamPage() {
  return (
    <main className="modern-shell min-h-screen text-[#0b192c]">
      <div className="sticky top-0 z-50 bg-[#071426] shadow-xl shadow-blue-950/30">
        <SiteHeader label="Back to news" href="/news" />
      </div>
      <section className="hero-grid relative overflow-hidden text-white">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-24">
          <a href="/news" className="relative z-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100 hover:text-white"><ArrowLeft size={14} aria-hidden="true" /> All news</a>
          <div className="relative z-10 mt-12 max-w-4xl">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">France National Team · October 2026</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">France brings a six-member team to the global stage.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">From Under-19 to Under-40, the French team reflects the depth and range of the country&apos;s hackathon community.</p>
          </div>
        </div>
      </section>
      <article className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-blue-900/10">
          <img src="/news/france-team.jpg" alt="The six members of the France hackathon team at European Hackathon" className="h-auto max-h-[680px] w-full object-cover object-center" />
          <div className="grid gap-4 border-b border-blue-100/80 bg-white/60 p-5 sm:grid-cols-3 sm:p-7">
            <div className="flex items-center gap-3"><CalendarDays size={17} className="text-[#3b5da8]" aria-hidden="true" /><span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Competition</strong><span className="text-sm text-slate-600">World Hackathon Championship 2027</span></span></div>
            <div className="flex items-center gap-3"><MapPin size={17} className="text-[#3b5da8]" aria-hidden="true" /><span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Representing</strong><span className="text-sm text-slate-600">France</span></span></div>
            <div className="flex items-center gap-3"><Users size={17} className="text-[#3b5da8]" aria-hidden="true" /><span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Squad size</strong><span className="text-sm text-slate-600">6 participants</span></span></div>
          </div>
          <div className="prose prose-slate max-w-none p-6 sm:p-10 lg:p-14">
            <p className="lead text-xl leading-9 text-slate-700">France is bringing a broad, multi-generational team of innovators to the World Hackathon Federation stage. The six participants were selected from the federation&apos;s France directory and will represent three competition divisions.</p>
            <h2>Meet Team France</h2>
            <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
              {team.map(([name, division]) => <div key={name} className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm"><p className="font-semibold text-[#102d59]">{name}</p><p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#3b5da8]">{division}</p></div>)}
            </div>
            <h2>One team, three generations of builders</h2>
            <p>The France team&apos;s composition creates an opportunity for knowledge exchange across experience levels. Their shared preparation will bring together the curiosity of new competitors, the momentum of young professionals, and the perspective of experienced technical leaders.</p>
          </div>
        </div>
        <div className="mt-10 flex justify-between gap-4">
          <a href="/news" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]"><ArrowLeft size={14} aria-hidden="true" /> Back to all news</a>
          <a href="/members" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#315d93] hover:text-[#142c4e]">Member nations <ArrowRight size={14} aria-hidden="true" /></a>
        </div>
      </article>
      <footer className="bg-[#071426] px-5 py-12 text-white lg:px-8"><div className="mx-auto max-w-7xl text-sm text-blue-100/60">World Hackathon Federation · Newsroom</div></footer>
    </main>
  )
}
