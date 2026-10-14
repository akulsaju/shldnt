'use client'

import { useMemo, useState } from 'react'
import { Flag } from '@/lib/country-flags'
import { SiteHeader } from '@/components/site-header'

const countries = [
  'United Arab Emirates', 'United States', 'United Kingdom', 'Canada', 'India', 'Australia', 'Japan', 'Germany', 'France', 'Brazil', 'China', 'Singapore', 'Qatar', 'Saudi Arabia', 'Pakistan', 'Bangladesh', 'South Korea', 'Türkiye', 'Italy', 'Spain', 'Netherlands', 'Nigeria', 'Kenya', 'South Africa', 'Mexico', 'Argentina', 'Russia', 'Ukraine', 'Sweden', 'Switzerland', 'Ireland', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'Egypt', 'Ghana', 'Ethiopia', 'Morocco', 'Chile', 'Colombia', 'Peru', 'Poland', 'Portugal', 'Greece', 'Norway', 'Denmark', 'Finland', 'Austria', 'Belgium', 'Czechia', 'Romania', 'New Zealand', 'Fiji', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Iraq', 'Afghanistan', 'Nepal', 'Sri Lanka', 'Kazakhstan', 'Azerbaijan', 'Armenia', 'Georgia', 'Serbia', 'Croatia', 'Slovenia', 'Slovakia', 'Hungary', 'Bulgaria', 'Lithuania', 'Latvia', 'Estonia', 'Iceland', 'Luxembourg', 'Malta', 'Cyprus', 'Albania', 'Moldova', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador', 'Costa Rica', 'Panama', 'Cuba', 'Jamaica', 'Haiti', 'Bahamas', 'Barbados', 'Trinidad and Tobago', 'Venezuela', 'Tanzania', 'Uganda', 'Rwanda', 'Senegal', 'Cameroon', 'Algeria', 'Tunisia', 'Libya', 'Sudan', 'Somalia', 'Zimbabwe', 'Zambia', 'Botswana', 'Namibia', 'Mozambique', 'Angola', 'Benin', 'Gabon', 'Madagascar', 'Mauritius', 'Seychelles', 'Sierra Leone', 'Liberia', 'Guinea', 'Mali', 'Niger', 'Chad', 'Burkina Faso', 'Togo', 'Tonga', 'Samoa', 'Nepal', 'Mongolia', 'Myanmar', 'Cambodia', 'Laos', 'Taiwan', 'North Macedonia', 'Montenegro', 'Kosovo', 'Bosnia and Herzegovina', 'Estonia', 'Belarus', 'Macedonia', 'Monaco', 'Liechtenstein', 'Andorra', 'San Marino', 'Vatican City', 'Maldives', 'Brunei', 'Timor-Leste', 'Papua New Guinea', 'Solomon Islands', 'Vanuatu', 'Micronesia', 'Palau', 'Marshall Islands', 'Nauru', 'Kiribati', 'Tuvalu', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Belize', 'Dominican Republic', 'Puerto Rico', 'Guyana', 'Suriname', 'Grenada', 'Dominica', 'Saint Lucia', 'Antigua and Barbuda', 'Saint Kitts and Nevis', 'Saint Vincent and the Grenadines', 'Cape Verde', 'Comoros', 'Djibouti', 'Eritrea', 'Equatorial Guinea', 'Eswatini', 'Lesotho', 'Malawi', 'Mauritania', 'Sao Tome and Principe', 'South Sudan', 'Western Sahara', 'Palestine', 'Kosovo', 'North Korea', 'Congo', 'Central African Republic', 'Cabo Verde', 'Bhutan', 'Uzbekistan', 'Turkmenistan', 'Tajikistan', 'Kyrgyzstan'
]


const supplementalCountries = ['Antigua and Barbuda', 'Saint Kitts and Nevis', 'Saint Vincent and the Grenadines', 'Comoros', 'Djibouti', 'Eritrea', 'Eswatini', 'Lesotho', 'Malawi', 'Sao Tome and Principe', 'South Sudan', 'Western Sahara', 'Kosovo', 'Congo']
const allCountries = Array.from(new Set([...countries, ...supplementalCountries]))

export default function MembersPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => allCountries.filter((country) => country.toLowerCase().includes(query.toLowerCase())), [query])

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

      <section className="bg-[linear-gradient(180deg,#0a1e38_0%,#0f2b4d_100%)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">Country index</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Browse the registry</h2></div><p className="text-sm text-blue-100/65">Showing {filtered.length} of {allCountries.length}</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((country, index) => <a href={`/members/${country.toLowerCase().replaceAll(' ', '-')}`} key={`${country}-${index}`} className="group flex min-h-[92px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-4 shadow-lg shadow-blue-950/10 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-white/[0.14] hover:shadow-cyan-950/30"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15" aria-hidden="true"><Flag country={country} className="h-7 w-10 rounded object-cover" /></span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-200/70">{String(index + 1).padStart(3, '0')}</span><span className="mt-1 block truncate font-semibold text-white group-hover:text-cyan-100">{country}</span></span><span className="ml-auto text-cyan-200/60 transition group-hover:translate-x-1" aria-hidden="true">→</span></a>)}
        </div>
        {filtered.length === 0 && <div className="rounded-3xl border border-dashed border-cyan-200/30 bg-white/10 p-12 text-center"><p className="font-semibold text-white">No countries found</p><p className="mt-2 text-sm text-blue-100/65">Try a different search term.</p></div>}
        </div>
      </section>

      <footer className="border-t border-[#243e62] bg-[#071426] px-5 py-12 text-[#dbeafe] lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">World Hackathon Federation</p><p className="mt-3 max-w-md text-sm leading-6 text-[#b7c9df]">A shared framework for fair, open, and globally connected hackathons.</p></div><a href="/about" className="text-xs font-bold uppercase tracking-[0.16em] text-[#a5f3fc] hover:text-white">About the federation →</a></div></footer>
    </main>
  )
}
