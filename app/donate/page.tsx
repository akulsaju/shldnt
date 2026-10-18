import type { Metadata } from 'next'
import { Heart } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { DonationEmbed } from '@/components/donation-embed'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support the World Hackathon Federation through its secure Hack Club donation form.',
  alternates: { canonical: '/donate' },
}

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#071426] text-white">
      <SiteHeader label="NHA Portal" />
      <section className="bg-gradient-to-br from-[#0b1c35] via-[#102d59] to-[#17143f]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
            <Heart size={14} aria-hidden="true" /> Support the federation
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Help builders go further.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80">
            Your contribution supports a more open, connected future for hackathon communities around the world.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
        <DonationEmbed />
      </section>
    </main>
  )
}
