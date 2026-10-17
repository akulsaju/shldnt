import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Official Hackathon Rules and Statutes',
  description: 'Read the World Hackathon Federation rulebook, including governance, eligibility, national teams, rankings, and World Hackathon Championship standards.',
  alternates: { canonical: '/rulebook' },
  openGraph: {
    title: 'Official Hackathon Rules and Statutes',
    description: 'The public WHF framework for fair, ethical, and internationally comparable hackathon competition.',
    url: `${siteConfig.url}/rulebook`,
    images: [{ url: '/favicon.jpg', width: 600, height: 600, alt: 'World Hackathon Federation logo' }],
  },
}

export default function RulebookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
