const links = [
  ['Home', '/'],
  ['News', '/news'],
  ['Member nations', '/members'],
  ['Championship', '/championship'],
  ['Live matches', '/live-matches'],
  ['Donate', '/donate'],
  ['Rulebook', '/rulebook'],
  ['About', '/about'],
]

export function SiteHeader({ label, href = '/portal', action }: { label?: string; href?: string; action?: ReactNode }) {
  return (
    <header className="border-b border-cyan-200/20 bg-gradient-to-r from-[#071426] via-[#102d59] to-[#1d1745] text-white">
      <div className="relative mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:min-h-[72px] sm:gap-6 sm:px-5 sm:py-4 lg:px-8">
        <a href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3" aria-label="World Hackathon Federation home">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-sm font-black text-[#071426]">W</span>
          <span className="text-[8px] font-bold leading-tight tracking-[0.08em] text-cyan-50 sm:text-[10px] sm:tracking-[0.14em]">WORLD<br />HACKATHON FEDERATION</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] font-bold uppercase tracking-[0.1em] text-cyan-50 lg:gap-x-5 lg:text-[10px] md:flex">
          {links.map(([name, href]) => <a key={href} href={href} className="transition-colors hover:text-cyan-200">{name}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          {action ?? <a href={href} className="shrink-0 rounded-full border border-cyan-200/60 bg-gradient-to-r from-cyan-300/20 to-violet-300/20 px-2.5 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-cyan-50 transition hover:from-cyan-300/35 hover:to-violet-300/35 sm:px-4 sm:py-2.5 sm:text-[10px] sm:tracking-[0.14em]"><span className="sm:hidden">Portal</span><span className="hidden sm:inline">{label ?? 'NHA Portal'}</span> <span className="ml-1">↗</span></a>}
          <details className="relative md:hidden">
            <summary aria-label="Open site navigation" className="grid size-9 cursor-pointer list-none place-items-center rounded-full border border-cyan-200/40 bg-white/5 text-cyan-50 hover:bg-white/10 [&::-webkit-details-marker]:hidden">
              <Menu size={18} aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-[calc(100%+0.75rem)] z-[60] grid w-[min(18rem,calc(100vw-1.5rem))] gap-1 rounded-2xl border border-cyan-200/20 bg-[#071426] p-2 text-sm font-semibold text-white shadow-2xl shadow-black/40">
              {links.map(([name, href]) => <a key={href} href={href} className="rounded-xl px-4 py-3 hover:bg-white/10 hover:text-cyan-100">{name}</a>)}
              <a href={href} className="rounded-xl border-t border-white/10 px-4 py-3 text-cyan-100 hover:bg-white/10">{label ?? 'NHA Portal'}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
import type { ReactNode } from 'react'
import { Menu } from 'lucide-react'
