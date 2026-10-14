'use client'

import { useMemo, useState } from 'react'
import { Flag } from '@/lib/country-flags'

const countries = [
  'United Arab Emirates', 'United States', 'United Kingdom', 'Canada', 'India', 'Australia', 'Japan', 'Germany', 'France', 'Brazil', 'China', 'Singapore', 'Qatar', 'Saudi Arabia', 'Pakistan', 'Bangladesh', 'South Korea', 'Türkiye', 'Italy', 'Spain', 'Netherlands', 'Nigeria', 'Kenya', 'South Africa', 'Mexico', 'Argentina', 'Russia', 'Ukraine', 'Sweden', 'Switzerland', 'Ireland', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'Egypt', 'Ghana', 'Ethiopia', 'Morocco', 'Chile', 'Colombia', 'Peru', 'Poland', 'Portugal', 'Greece', 'Norway', 'Denmark', 'Finland', 'Austria', 'Belgium', 'Czechia', 'Romania', 'New Zealand', 'Fiji', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Iraq', 'Afghanistan', 'Nepal', 'Sri Lanka', 'Kazakhstan', 'Azerbaijan', 'Armenia', 'Georgia', 'Serbia', 'Croatia', 'Slovenia', 'Slovakia', 'Hungary', 'Bulgaria', 'Lithuania', 'Latvia', 'Estonia', 'Iceland', 'Luxembourg', 'Malta', 'Cyprus', 'Albania', 'Moldova', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador', 'Costa Rica', 'Panama', 'Cuba', 'Jamaica', 'Haiti', 'Bahamas', 'Barbados', 'Trinidad and Tobago', 'Venezuela', 'Tanzania', 'Uganda', 'Rwanda', 'Senegal', 'Cameroon', 'Algeria', 'Tunisia', 'Libya', 'Sudan', 'Somalia', 'Zimbabwe', 'Zambia', 'Botswana', 'Namibia', 'Mozambique', 'Angola', 'Benin', 'Gabon', 'Madagascar', 'Mauritius', 'Seychelles', 'Sierra Leone', 'Liberia', 'Guinea', 'Mali', 'Niger', 'Chad', 'Burkina Faso', 'Togo', 'Tonga', 'Samoa', 'Nepal', 'Mongolia', 'Myanmar', 'Cambodia', 'Laos', 'Taiwan', 'North Macedonia', 'Montenegro', 'Kosovo', 'Bosnia and Herzegovina', 'Estonia', 'Belarus', 'Macedonia', 'Monaco', 'Liechtenstein', 'Andorra', 'San Marino', 'Vatican City', 'Maldives', 'Brunei', 'Timor-Leste', 'Papua New Guinea', 'Solomon Islands', 'Vanuatu', 'Micronesia', 'Palau', 'Marshall Islands', 'Nauru', 'Kiribati', 'Tuvalu', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Belize', 'Dominican Republic', 'Puerto Rico', 'Guyana', 'Suriname', 'Grenada', 'Dominica', 'Saint Lucia', 'Antigua and Barbuda', 'Saint Kitts and Nevis', 'Saint Vincent and the Grenadines', 'Cape Verde', 'Comoros', 'Djibouti', 'Eritrea', 'Equatorial Guinea', 'Eswatini', 'Lesotho', 'Malawi', 'Mauritania', 'Sao Tome and Principe', 'South Sudan', 'Western Sahara', 'Palestine', 'Kosovo', 'North Korea', 'Congo', 'Central African Republic', 'Cabo Verde', 'Bhutan', 'Uzbekistan', 'Turkmenistan', 'Tajikistan', 'Kyrgyzstan'
]



export default function MembersPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => countries.filter((country) => country.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <main className="members-page min-h-screen bg-[#f5f8fc] text-[#10233f]">
      <header className="sticky top-0 z-40 border-b border-[#d9e3ef] bg-[#fbfdff]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="text-center text-[9px] font-bold leading-[0.9] tracking-[0.16em] text-[#17376e]">WORLD<br />HACKATHON<br />FEDERATION</a>
          <a href="/" className="rounded-full border border-[#c8d7e8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#31557f] transition hover:bg-[#eaf2fb]">Back to WHF</a>
        </div>
      </header>

      <section className="border-b border-[#d9e3ef] bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,.22),transparent_24rem),linear-gradient(135deg,#eef7ff_0%,#fbfdff_52%,#f0efff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_280px] lg:px-8 lg:py-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#286095]">Federation registry · 2027</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-[#10233f] sm:text-7xl">National Hackathon Associations</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#355474]">A public directory of the countries and territories eligible to establish or operate a National Hackathon Association.</p>
            <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="country-search">Search countries</label>
              <input id="country-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries" className="h-14 flex-1 rounded-2xl border border-[#aabed4] bg-white px-5 text-[#10233f] shadow-sm outline-none ring-[#61c8dc] placeholder:text-[#6b829d] focus:ring-2" />
              <div className="members-count flex h-14 items-center justify-center rounded-2xl border border-[#b7c9dc] bg-white px-5 text-sm font-semibold text-[#28496e]">{filtered.length} countries</div>
            </div>
          </div>
          <aside className="rounded-[1.75rem] border border-[#c6d6e8] bg-white/80 p-6 shadow-[0_20px_50px_rgba(35,71,112,.1)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#35749a]">Registry status</p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-[#10233f]">Global</p>
            <p className="mt-2 text-sm leading-6 text-[#526b87]">One shared standard for national hackathon communities worldwide.</p>
            <div className="mt-6 h-px bg-[#d7e2ee]" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#496987]">Open directory</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4d7196]">Country index</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#10233f]">Browse the registry</h2></div><p className="text-sm text-[#55708e]">Showing {filtered.length} of {countries.length}</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((country, index) => <a href={`/members/${country.toLowerCase().replaceAll(' ', '-')}`} key={`${country}-${index}`} className="group flex min-h-[92px] items-center gap-4 rounded-2xl border border-[#d4dfeb] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(35,71,112,.045)] transition hover:-translate-y-0.5 hover:border-[#7ba8c9] hover:shadow-[0_14px_28px_rgba(35,71,112,.1)]"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#edf4fb]" aria-hidden="true"><Flag country={country} className="h-7 w-10 rounded object-cover" /></span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7290ad]">{String(index + 1).padStart(3, '0')}</span><span className="mt-1 block truncate font-semibold text-[#18395f] group-hover:text-[#0d5b8a]">{country}</span></span><span className="ml-auto text-[#87a0bb] transition group-hover:translate-x-1" aria-hidden="true">→</span></a>)}
        </div>
        {filtered.length === 0 && <div className="rounded-3xl border border-dashed border-[#b7c9dc] bg-white p-12 text-center"><p className="font-semibold text-[#18395f]">No countries found</p><p className="mt-2 text-sm text-[#55708e]">Try a different search term.</p></div>}
      </section>

      <footer className="border-t border-[#243e62] bg-[#071426] px-5 py-12 text-[#dbeafe] lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">World Hackathon Federation</p><p className="mt-3 max-w-md text-sm leading-6 text-[#b7c9df]">A shared framework for fair, open, and globally connected hackathons.</p></div><a href="/about" className="text-xs font-bold uppercase tracking-[0.16em] text-[#a5f3fc] hover:text-white">About the federation →</a></div></footer>
    </main>
  )
}
