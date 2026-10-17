const links = [
  ['Home', '/'],
  ['News', '/news'],
  ['Member nations', '/members'],
  ['Rulebook', '/rulebook'],
  ['About', '/about'],
]

export function SiteHeader({ label, href = '/portal', action }: { label?: string; href?: string; action?: ReactNode }) {
  return (
    <header className="border-b border-cyan-200/20 bg-gradient-to-r from-[#071426] via-[#102d59] to-[#1d1745] text-white">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="World Hackathon Federation home">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-sm font-black text-[#071426]">W</span>
          <span className="text-[10px] font-bold leading-tight tracking-[0.14em] text-cyan-50">WORLD<br />HACKATHON FEDERATION</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-50 md:flex">
          {links.map(([name, href]) => <a key={href} href={href} className="transition-colors hover:text-cyan-200">{name}</a>)}
        </nav>
        {action ?? <a href={href} className="shrink-0 rounded-full border border-cyan-200/60 bg-gradient-to-r from-cyan-300/20 to-violet-300/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-50 transition hover:from-cyan-300/35 hover:to-violet-300/35">{label ?? 'NHA Portal'} <span className="ml-1">↗</span></a>}
      </div>
    </header>
  )
}
import type { ReactNode } from 'react'
