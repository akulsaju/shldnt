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
            <a href="#cah" className="transition-colors hover:text-[#0b192c]">CAH (Arbitration)</a>
          </nav>
          <a href="#membership" className="border border-[#0b192c] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#0b192c] transition-colors hover:bg-[#0b192c] hover:text-white">NHA membership</a>
        </div>
      </header>

      <section id="top" className="border-b border-slate-200 bg-[#0b192c]">
        <div className="mx-auto grid max-w-7xl items-end gap-14 px-5 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-32">
          <div>
            <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.25em] text-[#b4c7e8]">International non-governmental organization · Founded 2024</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl lg:text-[86px]">A non-governmental organization for fair, open hackathons.</h1>
            <p className="mt-9 max-w-xl text-lg leading-8 text-slate-300">The WHF supports digital access, ethical competition, open-source collaboration, and transparent standards across national hackathon associations.</p>
            <a href="/rulebook" target="_blank" rel="noreferrer" className="mt-10 inline-flex bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b192c] transition-colors hover:bg-[#dbe7f8]">Read the statutes and rulebook <span className="ml-7">v4.0 ↗</span></a>
          </div>
          <div className="border-l border-white/20 pl-7 lg:mb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b4c7e8]">Our mandate</p>
            <p className="mt-5 text-2xl font-medium leading-snug text-white">A single, trusted standard for the world&apos;s most demanding technical competitions.</p>
            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-white/20 pt-5 text-[11px] uppercase tracking-[0.14em] text-slate-400"><span>64-team WHC final phase</span><span>6 recognized confederations</span></div>
          </div>
        </div>
      </section>

      <section id="charter" className="border-b border-slate-200 bg-[#e8eef7]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">The charter</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">A public framework for accountable competition.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">The WHF statutes define its decentralized structure, member rights, ethical duties, competition standards, and commitment to digital rights.</p><a href="/rulebook" target="_blank" rel="noreferrer" className="mt-8 inline-block border border-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#0b192c] hover:text-white">Open full rulebook ↗</a></div>
      </section>

      <section id="governance" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">01 / The federation</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">Built on standards, not spectacle.</h2></div><p className="max-w-xl text-lg leading-8 text-slate-600">The WHF protects the integrity of competitive engineering by making every event comparable, every rule transparent, and every participant accountable.</p></div>
        <div className="mt-20 grid border-t border-slate-200 md:grid-cols-3">
          {[['01', 'Global decentralization', 'Operating via a globally distributed network to ensure administrative equity.'], ['02', 'Uncompromising integrity', 'Strict AI usage guidelines, anti-plagiarism laws, and standardized infrastructure.'], ['03', 'Athlete welfare', 'Enforcing cognitive anti-doping policies and mandatory screen-dark rest intervals.']].map(([number, title, body]) => <article key={number} className="border-b border-slate-200 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="text-sm font-semibold text-[#34537e]">{number}</span><h3 className="mt-12 text-xl font-semibold capitalize">{title}</h3><p className="mt-4 max-w-xs text-sm leading-7 text-slate-600">{body}</p></article>)}
        </div>
      </section>

      <section id="membership" className="border-y border-slate-200 bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Member associations</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">National Hackathon Associations</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">The WHF recognizes one National Hackathon Association per sovereign nation or recognized territory, subject to the admission process in Article 5.</p><a href="/rulebook" target="_blank" rel="noreferrer" className="mt-8 inline-block border border-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#0b192c] hover:text-white">Read membership requirements ↗</a></div></section>

      <section id="cah" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Independent process</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">Court of Arbitration for Hackathons</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">The CAH is the arbitration body referenced by the WHF statutes for disputes arising under sanctioned competitions and member obligations.</p><a href="/rulebook" target="_blank" rel="noreferrer" className="mt-8 inline-block border border-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#0b192c] hover:text-white">View the governing articles ↗</a></section>

      <footer className="bg-[#0b192c] text-white"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]"><div><span className="block text-center text-[11px] font-bold leading-[0.9] tracking-[0.16em] text-white">WORLD<br />HACKATHON<br />FEDERATION</span><p className="mt-7 max-w-xs text-sm leading-6 text-slate-400">An international non-governmental organization supporting fair and open hackathons.</p></div><div><h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b4c7e8]">Explore</h3><ul className="mt-5 space-y-3 text-sm text-slate-300"><li><a href="#governance" className="hover:text-white">Governance</a></li><li><a href="#charter" className="hover:text-white">The Charter</a></li><li><a href="#membership" className="hover:text-white">Member Associations</a></li></ul></div><div><h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b4c7e8]">Independent process</h3><ul className="mt-5 space-y-3 text-sm text-slate-300"><li><a href="#cah" className="hover:text-white">CAH Arbitration</a></li><li><a href="/rulebook" target="_blank" rel="noreferrer" className="hover:text-white">Full rulebook ↗</a></li></ul></div></div><div className="mt-16 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[0.15em] text-slate-500">© 2026 World Hackathon Federation. All rights reserved.</div></div></footer>
    </main>
  )
}

