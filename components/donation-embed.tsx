'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

const donationUrl = 'https://hcb.hackclub.com/donations/start/whf'

export function DonationEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-1 flex-col md:min-h-0">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#0b1c35] px-4 py-2.5 sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 sm:text-xs">Support the federation</p>
        <a
          href={donationUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-cyan-50 hover:bg-cyan-200/20 sm:px-4 sm:text-[10px]"
        >
          Open separately <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
      <div className="relative flex min-h-[calc(100vh-124px)] flex-1 flex-col md:min-h-0">
        {!loaded && (
          <p role="status" className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full border border-cyan-200/20 bg-[#0b1c35]/90 px-4 py-2 text-xs text-cyan-50 shadow-lg">
            Loading the secure donation form…
          </p>
        )}
      <iframe
        title="Donate to the World Hackathon Federation"
        src={donationUrl}
        onLoad={() => setLoaded(true)}
        allow="payment"
        referrerPolicy="strict-origin-when-cross-origin"
        className="min-h-[calc(100vh-124px)] w-full flex-1 border-0 bg-white md:min-h-0"
      />
      </div>
    </div>
  )
}
