const pillars = [
  ['01', 'Open by design', 'Every sanctioned event publishes its rules, judging model, and participation path before the first commit.'],
  ['02', 'Fair by standard', 'A shared technical baseline makes competitions comparable across borders, time zones, and communities.'],
  ['03', 'Built for people', 'Participants get room to experiment, collaborate, rest, and grow without sacrificing integrity.'],
]

const pathway = [
  ['01', 'Join a national association', 'Start with a recognized NHA and enter the federation’s common competition framework.'],
  ['02', 'Qualify through your region', 'Teams progress through transparent regional pathways designed for local communities.'],
  ['03', 'Meet at the world final', 'The strongest teams come together for a 64-team World Hackathon Championship final.'],
]

export default function Page() {
  return (
    <main className="modern-shell min-h-screen text-[#0b192c]">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-[#071426]/85 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="World Hackathon Federation home">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-sm font-black text-[#071426]">W</span>
            <span className="hidden text-[10px] font-bold leading-tight tracking-[0.16em] sm:block">WORLD<br />HACKATHON FEDERATION</span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100 lg:flex">
            <a href="#mission" className="transition-colors hover:text-cyan-200">Mission</a>
            <a href="#standards" className="transition-colors hover:text-cyan-200">Standards</a>
            <a href="#pathway" className="transition-colors hover:text-cyan-200">Pathway</a>
            <a href="/members" className="transition-colors hover:text-cyan-200">Member nations</a>
          </nav>
          <a href="/portal" className="glow-button rounded-full border border-cyan-200/40 bg-white/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/20">NHA Portal <span className="ml-2">↗</span></a>
        </div>
      </header>

      <section id="top" className="hero-grid relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-32 lg:pt-28">
          <div className="animate-rise relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]" /> Founded 2024 · Independent federation</div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-[96px]">The world&apos;s<br /><span className="gradient-text">fair playbook</span><br />for builders.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-blue-100/80">The World Hackathon Federation gives every national association a trusted standard for open, ethical, and technically ambitious competition.</p>
            <div className="mt-10 flex flex-wrap gap-3"><a href="/members" className="glow-button rounded-full bg-gradient-to-r from-cyan-200 to-violet-200 px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-[#071426]">Explore the federation <span className="ml-7">↗</span></a><a href="#pathway" className="rounded-full border border-white/25 bg-white/5 px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white backdrop-blur hover:bg-white/10">How it works <span className="ml-7">↓</span></a></div>
          </div>
          <div className="animate-rise delay-150 relative z-10 self-end">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-5"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100">Federation brief</span><span className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-200">Active</span></div>
              <div className="grid grid-cols-2 gap-5 py-7"><div><p className="text-4xl font-semibold">180</p><p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-blue-200/60">Member records</p></div><div><p className="text-4xl font-semibold">64</p><p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-blue-200/60">Final teams</p></div><div><p className="text-4xl font-semibold">6</p><p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-blue-200/60">Confederations</p></div><div><p className="text-4xl font-semibold">1</p><p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-blue-200/60">Shared standard</p></div></div>
              <div className="rounded-2xl bg-gradient-to-r from-cyan-300/15 to-violet-300/15 p-4 text-sm leading-6 text-blue-50">“Competition is strongest when the rules are clear enough for anyone to enter.”</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-wrap gap-x-10 gap-y-3 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200/60 lg:px-8"><span>Open-source collaboration</span><span>·</span><span>Transparent judging</span><span>·</span><span>Global access</span></div></div>
      </section>

      <section id="mission" className="bg-white/75 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3b5da8]">01 / Why we exist</p><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">A better stage for ambitious technical minds.</h2></div><div><p className="max-w-2xl text-xl leading-9 text-slate-600">Hackathons are more than weekends and demos. They are a proving ground for ideas, teams, and the people building what comes next.</p><p className="mt-7 max-w-2xl text-base leading-8 text-slate-500">WHF coordinates the shared language between national associations so local energy can become global opportunity without losing the character of each community.</p></div></div></section>

      <section id="standards" className="border-y border-blue-100/80 bg-gradient-to-br from-[#e8f5ff] via-white to-[#f1edff] px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3b5da8]">02 / The standard</p><h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Built on standards,<br />not spectacle.</h2></div><p className="max-w-sm text-sm leading-7 text-slate-500">A common foundation for every sanctioned competition, from local qualifiers to the world final.</p></div><div className="mt-16 grid gap-4 md:grid-cols-3">{pillars.map(([number, title, body]) => <article key={number} className="soft-lift rounded-3xl border border-white bg-white/70 p-7 shadow-sm backdrop-blur"><span className="text-sm font-bold text-[#4266b3]">{number}</span><h3 className="mt-16 text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-500">{body}</p></article>)}</div></div></section>

      <section id="pathway" className="bg-[#071426] px-5 py-24 text-white lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">03 / The pathway</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">From local spark to global stage.</h2><a href="/rulebook" className="mt-8 inline-flex rounded-full border border-white/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#071426]">Read the rulebook ↗</a></div><div className="space-y-4">{pathway.map(([number, title, body]) => <div key={number} className="group flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-cyan-200/40 hover:bg-white/10"><span className="pt-1 text-sm font-bold text-cyan-200">{number}</span><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-blue-100/65">{body}</p></div><span className="ml-auto hidden text-cyan-200 transition-transform group-hover:translate-x-1 sm:block">↗</span></div>)}</div></div></div></section>

      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 px-5 py-24 text-[#071426] lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-900/65">04 / Join the network</p><h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Make your country part of the standard.</h2></div><a href="/portal" className="glow-button inline-flex shrink-0 rounded-full bg-[#071426] px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white">Open the NHA Portal <span className="ml-7">↗</span></a></div></section>

      <footer className="bg-[#071426] px-5 py-14 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-sm font-black text-[#071426]">W</span><span className="text-[10px] font-bold leading-tight tracking-[0.16em]">WORLD<br />HACKATHON FEDERATION</span></div><p className="mt-6 max-w-sm text-sm leading-6 text-blue-100/55">An independent framework for fair, open, and globally connected hackathons.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100/65"><a href="#mission" className="hover:text-white">Mission</a><a href="/members" className="hover:text-white">Members</a><a href="/rulebook" className="hover:text-white">Rulebook</a><a href="/portal" className="hover:text-white">NHA Portal</a></div></div><div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.15em] text-blue-100/35">© 2026 World Hackathon Federation · Statutes v4.0</div></footer>
    </main>
  )
}
