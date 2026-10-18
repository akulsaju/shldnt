'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

const donationUrl = 'https://hcb.hackclub.com/donations/start/whf'

export function DonationEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <p role="status" className="mb-4 rounded-xl border border-cyan-200/20 bg-cyan-100/10 px-4 py-3 text-sm text-cyan-50">
          Loading the secure donation form…
        </p>
      )}
      <iframe
        title="Donate to the World Hackathon Federation"
        src={donationUrl}
        onLoad={() => setLoaded(true)}
        allow="payment"
        referrerPolicy="strict-origin-when-cross-origin"
        className="min-h-[760px] w-full rounded-2xl border border-slate-200 bg-white"
      />
      <a
        href={donationUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-50 hover:bg-cyan-200/20"
      >
        Open donation form in a new tab <ExternalLink size={14} aria-hidden="true" />
      </a>
    </>
  )
}
