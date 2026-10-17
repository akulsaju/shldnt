import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'UAE National Under-19 Team Selected',
  description: 'Akul Saju and Saiqua Kazimi will represent the United Arab Emirates at the World Hackathon Championship 2027.',
  alternates: { canonical: '/news/uae-under-19-team' },
  openGraph: {
    title: 'UAE National Under-19 Team Selected | World Hackathon Federation',
    description: 'Akul Saju and Saiqua Kazimi will represent the United Arab Emirates at the World Hackathon Championship 2027.',
    url: '/news/uae-under-19-team',
    images: ['/favicon.jpg'],
  },
}

export default function UaeUnder19TeamPage() {
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
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">UAE National Team · October 2026</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">UAE students selected for the World Hackathon Championship 2027.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">Akul Saju and Saiqua Kazimi will carry the UAE flag as members of the United Arab Emirates National Under-19 Squad.</p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-blue-900/10">
          <img src="/news/uae-team-group.jpg" alt="The UAE student team with school representatives at Abu Dhabi Indian School" className="h-auto max-h-[620px] w-full object-cover object-center" />
          <div className="grid gap-4 border-b border-blue-100/80 bg-white/60 p-5 sm:grid-cols-3 sm:p-7">
            <div className="flex items-center gap-3"><CalendarDays size={17} className="text-[#3b5da8]" aria-hidden="true" /><span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Event</strong><span className="text-sm text-slate-600">August 2027</span></span></div>
            <div className="flex items-center gap-3"><MapPin size={17} className="text-[#3b5da8]" aria-hidden="true" /><span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Representing</strong><span className="text-sm text-slate-600">United Arab Emirates</span></span></div>
            <div className="flex items-center gap-3"><Trophy size={17} className="text-[#3b5da8]" aria-hidden="true" /><span><strong className="block text-[10px] uppercase tracking-[0.14em] text-[#3b5da8]">Division</strong><span className="text-sm text-slate-600">National Under-19 Team</span></span></div>
          </div>

          <div className="prose prose-slate max-w-none p-6 sm:p-10 lg:p-14">
            <p className="lead text-xl leading-9 text-slate-700">The World Hackathon Federation is proud to announce that Abu Dhabi Indian School students <strong>Akul Saju</strong> and <strong>Saiqua Kazimi</strong> have been officially selected to represent the United Arab Emirates National Under-19 Team at the World Hackathon Championship 2027.</p>
            <p>Both students attend Abu Dhabi Indian School (Branch 1, Al Wathba), on Al Sahl Street in Al Wathba South. Their selection follows a nationwide evaluation of young innovators and reflects the technical ambition of the UAE&apos;s student technology community.</p>
            <h2>Recognized for technical excellence</h2>
            <p>The nominations were decided by the WHF Selection Committee in association with Major League Hacking. The committee recognized Akul&apos;s leadership in student hackathons, advanced rapid-prototyping expertise, and track record of technical innovation.</p>
            <p>Saiqua was selected for her active participation in student science competitions, specialized hardware-design expertise, and dedication to developing pioneering technical solutions.</p>
            <div className="not-prose my-10 grid gap-5 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm">
                <img src="/news/uae-team-selection.jpg" alt="Akul Saju and Saiqua Kazimi with a school representative" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="p-4 text-xs leading-5 text-slate-500">The selected students with a representative of Abu Dhabi Indian School.</figcaption>
              </figure>
              <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-violet-50 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3b5da8]">A national moment</p>
                <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#102d59]">“We are honored to carry the UAE flag onto the global stage.”</p>
                <p className="mt-5 text-sm leading-7 text-slate-600">Akul and Saiqua will represent the country&apos;s forward-looking technology ecosystem at the August 2027 championship.</p>
              </div>
            </div>
            <h2>A place on the global stage</h2>
            <p>As members of the UAE National Under-19 Squad, Akul and Saiqua will bring their projects, preparation, and collaborative spirit to the World Hackathon Championship in August 2027. Their journey reflects the federation&apos;s belief that local school communities can be a launchpad for global technical opportunity.</p>
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
