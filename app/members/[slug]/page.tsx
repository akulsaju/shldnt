'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'

const regions = ['Africa', 'Americas', 'Asia-Pacific', 'Europe', 'Middle East']
const status = ['Recognized', 'Provisional', 'Under review']

function titleFromSlug(slug: string) {
  return slug.split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ')
}

export default function AssociationRecordPage() {
  const params = useParams<{ slug: string }>()
  const country = titleFromSlug(params.slug)
  const record = useMemo(() => {
    const seed = country.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
    return {
      id: `NHA-${String((seed % 180) + 1).padStart(3, '0')}`,
      region: country === 'United Arab Emirates' ? 'Middle East' : regions[seed % regions.length],
      status: status[seed % status.length],
      founded: 2020 + (seed % 6),
      secretary: ['National Secretariat', 'Founding Committee', 'Executive Office'][seed % 3],
    }
  }, [country])

  return <main className="min-h-screen bg-[#f6f8fb] text-[#0b192c]"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><a href="/members" className="text-center text-[9px] font-bold leading-[0.9] tracking-[0.16em] text-[#17376e]">WORLD<br />HACKATHON<br />FEDERATION</a><a href="/members" className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 hover:text-[#0b192c]">All members</a></div></header><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="animate-rise border-b border-[#0b192c] pb-12"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">National association record · {record.id}</p><h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">{country}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">National Hackathon Association of {country}</p></div><div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4"><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Registry status</p><p className="mt-4 text-xl font-semibold">{record.status}</p></div><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">WHF region</p><p className="mt-4 text-xl font-semibold">{record.region}</p></div><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Record opened</p><p className="mt-4 text-xl font-semibold">{record.founded}</p></div><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Public contact</p><p className="mt-4 text-xl font-semibold">{record.secretary}</p></div></div><section className="mt-16 max-w-3xl border-t border-slate-300 pt-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Association profile</p><h2 className="mt-4 text-3xl font-semibold">A national point of coordination</h2><p className="mt-5 text-base leading-8 text-slate-600">This registry record identifies the national association responsible for coordinating WHF-aligned hackathon activity, participant welfare, and communication with the federation. The details shown here are an association record prepared for the public directory.</p><a href="/portal" className="mt-8 inline-block border border-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#0b192c] hover:text-white">Update this association record ↗</a></section></div></main>
}
