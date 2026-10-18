import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { DonationEmbed } from '@/components/donation-embed'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support the World Hackathon Federation through its secure Hack Club donation form.',
  alternates: { canonical: '/donate' },
}

export default function DonatePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#071426] text-white md:h-dvh md:min-h-0">
      <SiteHeader label="NHA Portal" />
      <section aria-label="Donation form" className="flex min-h-[calc(100vh-72px)] flex-1 flex-col md:min-h-0">
        <DonationEmbed />
      </section>
    </main>
  )
}
