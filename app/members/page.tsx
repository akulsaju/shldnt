'use client'

import { useMemo, useState } from 'react'
import { Flag } from '@/lib/country-flags'
import { memberCountries } from '@/lib/member-countries'
import { SiteHeader } from '@/components/site-header'

export default function MembersPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => memberCountries.filter((country) => country.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <main className="members-page min-h-screen bg-[#071426] text-[#10233f]">
      <SiteHeader label="Back to WHF" href="/" />

      <section className="relative overflow-hidden border-b border-cyan-200/20 bg-[radial-gradient(circle_at_85%_0%,rgba(103,232,249,.32),transparent_28rem),radial-gradient(circle_at_0%_100%,rgba(79,70,229,.36),transparent_32rem),linear-gradient(135deg,#0b2b52_0%,#123f70_52%,#24194f_100%)] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_280px] lg:px-8 lg:py-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">Federation registry · 2027</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">National Hackathon Associations</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100/80">A public directory of the countries and territories eligible to establish or operate a National Hackathon Association.</p>
            <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="country-search">Search countries</label>
              <input id="country-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries" className="h-14 flex-1 rounded-2xl border border-white/30 bg-white/95 px-5 text-[#10233f] shadow-xl shadow-blue-950/20 outline-none ring-cyan-300 placeholder:text-[#6b829d] focus:ring-2" />
              <div className="members-count flex h-14 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-100/15 px-5 text-sm font-semibold text-cyan-50 backdrop-blur">{filtered.length} countries</div>
            </div>
          </div>
          <aside className="rounded-[1.75rem] border border-cyan-100/25 bg-[#071426]/35 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">Registry status</p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-white">Global</p>
            <p className="mt-2 text-sm leading-6 text-blue-100/75">One shared standard for national hackathon communities worldwide.</p>
            <div className="mt-6 h-px bg-white/15" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">Open directory</p>
          </aside>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#e8f3ff_0%,#d7e9fb_100%)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#286095]">Country index</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#102d59]">Browse the registry</h2></div><p className="text-sm text-[#476987]">Showing {filtered.length} of {memberCountries.length}</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((country, index) => <a href={`/members/${country.toLowerCase().replaceAll(' ', '-')}`} key={`${country}-${index}`} className="group flex min-h-[92px] items-center gap-4 rounded-2xl border border-[#c5d9ee] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(31,76,125,.12)] transition hover:-translate-y-0.5 hover:border-[#2f8eb5] hover:shadow-[0_14px_30px_rgba(31,76,125,.2)]"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#edf5fd] ring-1 ring-[#c7dced]" aria-hidden="true"><Flag country={country} className="h-7 w-10 rounded object-cover" /></span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#6a87a5]">{String(index + 1).padStart(3, '0')}</span><span className="mt-1 block truncate font-semibold text-[#18395f] group-hover:text-[#0d5b8a]">{country}</span></span><span className="ml-auto text-[#4f86ad] transition group-hover:translate-x-1" aria-hidden="true">→</span></a>)}
        </div>
        {filtered.length === 0 && <div className="rounded-3xl border border-dashed border-[#8fb6d6] bg-white/80 p-12 text-center"><p className="font-semibold text-[#18395f]">No countries found</p><p className="mt-2 text-sm text-[#55708e]">Try a different search term.</p></div>}
        </div>
      </section>

      <footer className="border-t border-[#243e62] bg-[#071426] px-5 py-12 text-[#dbeafe] lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">World Hackathon Federation</p><p className="mt-3 max-w-md text-sm leading-6 text-[#b7c9df]">A shared framework for fair, open, and globally connected hackathons.</p></div><a href="/about" className="text-xs font-bold uppercase tracking-[0.16em] text-[#a5f3fc] hover:text-white">About the federation →</a></div></footer>
    </main>
  )
}
