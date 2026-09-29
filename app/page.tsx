const updates = [
  ['18 SEP 2026', 'WHF releases updated guidelines on permitted LLM usage'],
  ['04 SEP 2026', 'Bidding process opens for the 2029 World Championship host nation'],
  ['22 AUG 2026', 'New National Hackathon Associations admitted to the General Assembly'],
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-[#0b192c]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#top" aria-label="World Hackathon Federation home" className="shrink-0">
            <span className="block text-center text-[9px] font-bold leading-[0.9] tracking-[0.16em] text-[#17376e]">WORLD<br />HACKATHON<br />FEDERATION</span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 lg:flex">
            <a href="#governance" className="transition-colors hover:text-[#0b192c]">Governance</a>
            <a href="#charter" className="transition-colors hover:text-[#0b192c]">The Charter</a>
            <a href="#nations" className="transition-colors hover:text-[#0b192c]">Member Nations</a>
            <a href="#news" className="transition-colors hover:text-[#0b192c]">News</a>
            <a href="#cah" className="transition-colors hover:text-[#0b192c]">CAH (Arbitration)</a>
          </nav>
          <a href="#portal" className="border border-[#0b192c] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#0b192c] transition-colors hover:bg-[#0b192c] hover:text-white">NHA Portal Login</a>
        </div>
      </header>

      <section id="top" className="border-b border-slate-200 bg-[#0b192c]">
        <div className="mx-auto grid max-w-7xl items-end gap-14 px-5 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-32">
          <div>
            <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.25em] text-[#b4c7e8]">Established 2024 · Geneva</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl lg:text-[86px]">The global authority on competitive engineering.</h1>
            <p className="mt-9 max-w-xl text-lg leading-8 text-slate-300">Fostering technological advancement through structured, fair, and rigorously governed competitive hackathons worldwide.</p>
            <a href="#charter" className="mt-10 inline-flex bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b192c] transition-colors hover:bg-[#dbe7f8]">Download official rulebook <span className="ml-7">v4.0</span></a>
          </div>
          <div className="border-l border-white/20 pl-7 lg:mb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b4c7e8]">Our mandate</p>
            <p className="mt-5 text-2xl font-medium leading-snug text-white">A single, trusted standard for the world&apos;s most demanding technical competitions.</p>
            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-white/20 pt-5 text-[11px] uppercase tracking-[0.14em] text-slate-400"><span>64 member nations</span><span>4 continental unions</span></div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#e8eef7]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-8 lg:flex-row lg:items-center lg:px-8">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Next official event</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">World Hackathon Championship <span className="font-normal text-[#34537e]">/ August 2027</span></h2><p className="mt-2 text-sm text-slate-600">The ultimate 72-hour endurance test. 64 nations. 1 champion.</p></div>
          <a href="#nations" className="inline-flex w-fit border border-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#0b192c] hover:text-white">View qualifiers</a>
        </div>
      </section>

      <section id="governance" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">01 / The federation</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">Built on standards, not spectacle.</h2></div><p className="max-w-xl text-lg leading-8 text-slate-600">The WHF protects the integrity of competitive engineering by making every event comparable, every rule transparent, and every participant accountable.</p></div>
        <div className="mt-20 grid border-t border-slate-200 md:grid-cols-3">
          {[['01', 'Global decentralization', 'Operating via a globally distributed network to ensure administrative equity.'], ['02', 'Uncompromising integrity', 'Strict AI usage guidelines, anti-plagiarism laws, and standardized infrastructure.'], ['03', 'Athlete welfare', 'Enforcing cognitive anti-doping policies and mandatory screen-dark rest intervals.']].map(([number, title, body]) => <article key={number} className="border-b border-slate-200 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="text-sm font-semibold text-[#34537e]">{number}</span><h3 className="mt-12 text-xl font-semibold capitalize">{title}</h3><p className="mt-4 max-w-xs text-sm leading-7 text-slate-600">{body}</p></article>)}
        </div>
      </section>

      <section id="news" className="border-y border-slate-200 bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="flex items-end justify-between border-b border-slate-300 pb-6"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">02 / Official record</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Latest governance directives</h2></div><span className="hidden text-[11px] uppercase tracking-[0.15em] text-slate-500 sm:block">News & notices</span></div><div>{updates.map(([date, title]) => <a href="#news" key={title} className="grid gap-3 border-b border-slate-200 py-6 transition-colors hover:bg-white md:grid-cols-[180px_1fr_auto] md:items-center md:px-4"><span className="text-[11px] font-bold tracking-[0.15em] text-[#34537e]">{date}</span><span className="text-lg font-medium">{title}</span><span className="text-xl text-[#34537e]" aria-hidden="true">↗</span></a>)}</div></div></section>

      <footer className="bg-[#0b192c] text-white"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]"><div><span className="block text-center text-[11px] font-bold leading-[0.9] tracking-[0.16em] text-white">WORLD<br />HACKATHON<br />FEDERATION</span><p className="mt-7 max-w-xs text-sm leading-6 text-slate-400">The global authority on competitive engineering.</p></div>{[['Organization', 'Statutes', 'Executive Council', 'Secretariat'], ['Competitions', 'Championship', 'Continental Cups', 'Qualifiers'], ['Resources', 'Media Rights', 'Branding Guidelines', 'Press Office'], ['Legal', 'Privacy', 'Anti-Doping Code', 'Contact']].map(([heading, ...links]) => <div key={heading}><h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b4c7e8]">{heading}</h3><ul className="mt-5 space-y-3 text-sm text-slate-300">{links.map(link => <li key={link}><a href="#top" className="hover:text-white">{link}</a></li>)}</ul></div>)}</div><div className="mt-16 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[0.15em] text-slate-500">© 2026 World Hackathon Federation. All rights reserved.</div></div></footer>
    </main>
  )
}

