import type { Metadata } from 'next'
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Newspaper } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'News',
  description: 'The latest announcements, milestones, and stories from the World Hackathon Federation.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'News | World Hackathon Federation',
    description: 'The latest announcements, milestones, and stories from the World Hackathon Federation.',
    url: '/news',
    images: [{ url: '/favicon.jpg', width: 600, height: 600, alt: 'World Hackathon Federation logo' }],
  },
}

const stories = [
  {
    category: 'Match Report',
    date: 'October 2026',
    title: 'UAE defeats Saudi Arabia in October 16 match',
    description: 'The United Arab Emirates secured a victory over Saudi Arabia in a match played from 8:30 AM to 2:30 PM UAE time.',
    href: '/news/uae-vs-saudi-match',
    number: '01',
    tone: 'from-cyan-200 via-sky-100 to-indigo-200',
    artwork: 'UAE / SAUDI ARABIA',
    image: undefined as string | undefined,
    flags: ['/country-flags-main/svg/ae.svg', '/country-flags-main/svg/sa.svg'] as string[] | undefined,
  },
  {
    category: 'UAE National Team',
    date: 'October 2026',
    title: 'UAE names its National Under-19 team for 2027',
    description: 'Abu Dhabi Indian School students Akul Saju and Saiqua Kazimi will represent the United Arab Emirates at the World Hackathon Championship 2027.',
    href: '/news/uae-under-19-team',
    number: '02',
    tone: 'from-cyan-200 via-sky-100 to-indigo-200',
    artwork: 'TEAM UAE / 2027',
    image: '/news/uae-team-group.jpg' as string | undefined,
    flags: undefined as string[] | undefined,
  },
  {
    category: 'Championship',
    date: 'October 2026',
    title: 'France brings six innovators to the global stage',
    description: 'The French hackathon community is represented by a six-member national team spanning the Under-19, Under-25, and Under-40 divisions.',
    href: '/news/france-hackathon-team',
    number: '03',
    tone: 'from-violet-200 via-fuchsia-100 to-cyan-100',
    artwork: 'FRANCE / TEAM 2027',
    image: '/news/france-team.jpg' as string | undefined,
    flags: undefined as string[] | undefined,
  },
  {
    category: 'Community',
    date: 'September 2026',
    title: 'Building competitions where people can do their best work',
    description: 'Healthy competition makes room for focus, collaboration, and rest—because great work starts with people who can thrive.',
    href: '/about',
    number: '04',
    tone: 'from-amber-100 via-orange-100 to-rose-200',
    artwork: 'PEOPLE FIRST',
    image: undefined as string | undefined,
    flags: undefined as string[] | undefined,
  },
]

export default function NewsPage() {
  return (
    <main className="modern-shell min-h-screen text-[#0b192c]">
      <div className="sticky top-0 z-50 bg-[#071426] shadow-xl shadow-blue-950/30">
        <SiteHeader label="NHA Portal" />
      </div>

      <section className="hero-grid relative text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 sm:pt-20 lg:grid-cols-[1fr_0.78fr] lg:px-8 lg:pb-24 lg:pt-24">
          <div className="animate-rise relative z-10 self-center">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">
              <Newspaper size={14} aria-hidden="true" />
              The federation journal
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">
              News from the <span className="gradient-text">global stage.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/80">
              Updates, ideas, and milestones shaping a more open future for competitive hackathons.
            </p>
            <a href="#latest" className="glow-button mt-9 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-cyan-200 to-violet-200 px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-[#071426]">
              Explore the latest <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>

          <aside className="animate-rise delay-150 relative z-10 self-center">
            <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#143c6e] via-[#1c376a] to-[#3c2467] p-7 shadow-2xl shadow-black/25 sm:min-h-[360px] sm:p-9">
              <div className="absolute -right-16 -top-20 size-72 rounded-full border border-cyan-100/20 shadow-[0_0_0_38px_rgba(103,232,249,.04),0_0_0_76px_rgba(167,139,250,.04)]" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#071426]/65 to-transparent" aria-hidden="true" />
              <div className="relative z-10 flex h-full min-h-[250px] flex-col justify-between sm:min-h-[290px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100">In focus · 01</span>
                  <ArrowUpRight size={18} className="text-cyan-100/75" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">The WHF framework</p>
                  <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">Clear rules. Fair play. A world of possibility.</h2>
                  <a href="/rulebook" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white hover:text-cyan-100">
                    Discover the standards <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="relative z-10 border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100/65 lg:px-8">
            <span>Ideas for builders</span><span aria-hidden="true">·</span><span>Updates from the federation</span><span aria-hidden="true">·</span><span>One global community</span>
          </div>
        </div>
      </section>

      <section id="latest" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3b5da8]">From the federation</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0b1c35] sm:text-5xl">The latest stories.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Perspectives and updates from across the World Hackathon Federation.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <article key={story.number} className="group overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-sm backdrop-blur-xl">
                <div className={`relative flex h-52 items-end overflow-hidden bg-gradient-to-br ${story.tone} p-6`}>
                  {story.image && <img src={story.image} alt="" className="absolute inset-0 size-full object-cover object-top" />}
                  {story.flags && (
                    <div className="absolute inset-0 flex items-center justify-center gap-5">
                      {story.flags.map((flag) => (
                        <img key={flag} src={flag} alt="" className="h-20 w-28 rounded-lg object-cover shadow-xl ring-2 ring-white/40" />
                      ))}
                    </div>
                  )}
                  {story.image && <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/80 via-transparent to-transparent" />}
                  <div className="absolute -right-10 -top-14 size-48 rounded-full border border-[#102d59]/10 shadow-[0_0_0_26px_rgba(16,45,89,.035),0_0_0_52px_rgba(16,45,89,.025)] transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{story.artwork}</span>
                  <span className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-white/60 bg-white/35 text-[10px] font-bold text-[#18365a] backdrop-blur">{story.number}</span>
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#4b6689]">
                    <span className="rounded-full bg-[#e6f3ff] px-3 py-1.5 text-[#315d93]">{story.category}</span>
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={12} aria-hidden="true" />{story.date}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug text-[#0b1c35]">{story.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{story.description}</p>
                  <a href={story.href} className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.13em] text-[#315d93] group-hover:text-[#142c4e]">
                    Explore the story <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/70 bg-gradient-to-br from-[#e8f5ff] via-white to-[#f1edff] px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3b5da8]">Be part of the story</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-[#0b1c35] sm:text-4xl">Meet the people building the global community.</h2>
          </div>
          <a href="/members" className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#071426] px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white hover:bg-[#163c78]">
            Explore member nations <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="bg-[#071426] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">World Hackathon Federation</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-blue-100/60">A shared framework for fair, open, and globally connected hackathons.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100/65">
            <a href="/about" className="hover:text-white">About</a><a href="/members" className="hover:text-white">Member nations</a><a href="/rulebook" className="hover:text-white">Rulebook</a>
          </nav>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.15em] text-blue-100/35">© 2026 World Hackathon Federation</div>
      </footer>
    </main>
  )
}
