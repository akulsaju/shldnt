const principles = [
  ['Fairness by design', 'Transparent rules and consistent standards give builders from every member nation an equal shot at recognition.'],
  ['Real human craftsmanship', 'Modern development tools are welcome, while competition rules keep human engineering at the center of every project.'],
  ['Rest is part of performance', 'Screen-Dark rest cycles protect the health, focus, and creativity of teams during endurance events.'],
  ['Proof over promises', 'Live code interrogations and clear review pathways protect merit and celebrate genuine technical craft.'],
]

const workstreams = ['Recognition and governance for national hackathon associations', 'A shared championship pathway with clear qualification standards', 'Open rulebooks and participation frameworks for organizers', 'A trusted global directory of teams, mentors, judges, and partners']

const regions = ['Asian Hackathon Confederation', 'Confederation of African Hackathons', 'CONCACAH', 'CONMEHA', 'Oceania Hackathon Confederation', 'Western & Eastern European Union']

export default function AboutPage() {
  return (
    <main className="modern-shell min-h-screen text-[#0b192c]">
      <header className="sticky top-0 z-40 border-b border-cyan-200/20 bg-gradient-to-r from-[#071426]/95 via-[#102d59]/95 to-[#1d1745]/95 text-white shadow-lg shadow-blue-950/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="World Hackathon Federation home">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-sm font-black text-[#071426]">W</span>
            <span className="text-[10px] font-bold leading-tight tracking-[0.14em] text-cyan-50">WORLD<br />HACKATHON FEDERATION</span>
          </a>
          <nav aria-label="About navigation" className="hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-50 sm:flex">
            <a href="/" className="hover:text-cyan-200">Home</a>
            <a href="/members" className="hover:text-cyan-200">Member nations</a>
            <a href="/rulebook" className="hover:text-cyan-200">Rulebook</a>
          </nav>
          <a href="/portal" className="rounded-full border border-cyan-200/50 bg-gradient-to-r from-cyan-300/20 to-violet-300/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-50">NHA Portal</a>
        </div>
      </header>

      <section className="hero-grid text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
          <div className="animate-rise">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-200">About the federation</p>
            <h1 className="gradient-text mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-7xl">Code for humanity. Build for the world.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">We are the global home for builders, dreamers, late-night debuggers, and problem solvers. WHF is where competitive software engineering meets a connected community.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="/members" className="glow-button rounded-full bg-gradient-to-r from-cyan-200 to-violet-200 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#071426]">Explore member nations</a><a href="/rulebook" className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white">Read our framework</a></div>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl lg:mt-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200">Our role</p>
            <p className="mt-7 text-2xl font-medium leading-tight text-white">One connected standard. Many local communities. A stronger future for builders.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-center"><div><p className="text-2xl font-semibold">142</p><p className="mt-1 text-[9px] uppercase tracking-wider text-blue-200">member nations</p></div><div><p className="text-2xl font-semibold">6</p><p className="mt-1 text-[9px] uppercase tracking-wider text-blue-200">regional networks</p></div><div><p className="text-2xl font-semibold">64</p><p className="mt-1 text-[9px] uppercase tracking-wider text-blue-200">championship teams</p></div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Why we exist</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Hackathons deserve a global home.</h2></div><div className="space-y-6 text-lg leading-8 text-slate-600"><p>Hackathons have grown from scrappy weekend meetups into a worldwide discipline. WHF exists to give that movement a fair, supportive, and open global standard.</p><p>We level the playing field for builders in all 142 member nations, protect genuine human engineering, and help communities compete without sacrificing their health or sense of belonging.</p></div></div></section>

      <section className="border-y border-white/70 bg-gradient-to-br from-white/75 via-cyan-50/70 to-violet-50/80"><div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">What we do</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{workstreams.map((item, index) => <article key={item} className="rounded-2xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl"><span className="text-sm font-bold text-cyan-600">0{index + 1}</span><p className="mt-5 text-lg font-medium leading-7">{item}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-10"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Our principles</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Designed for trust.</h2></div><div className="grid gap-5 md:grid-cols-2">{principles.map(([title, body]) => <article key={title} className="rounded-2xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-xl"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{body}</p></article>)}</div></section>

      <section className="border-y border-white/70 bg-gradient-to-br from-[#e8f5ff] via-white to-[#f1edff]"><div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24"><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">A global network</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Local communities. One shared stage.</h2></div><div><p className="text-lg leading-8 text-slate-600">WHF operates through a decentralized network spanning six continents. Every two years, the strongest national teams come together for the World Hackathon Championship.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{regions.map((region, index) => <div key={region} className="rounded-xl border border-white/80 bg-white/70 p-4 text-sm font-medium shadow-sm"><span className="mr-3 text-xs font-bold text-cyan-600">0{index + 1}</span>{region}</div>)}</div></div></div></div></section>

      <section className="hero-grid text-white"><div className="mx-auto flex max-w-6xl flex-col gap-7 px-5 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200">Join the network</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Help shape the next generation of hackathons.</h2></div><a href="/members" className="glow-button inline-flex w-fit rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#071426]">View the federation</a></div></section>
    </main>
  )
}
