import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'WHF Rulebook | Official Hackathon Rules and Statutes',
  description: 'Read the World Hackathon Federation public rulebook for governance, eligibility, sanctioned events, judging, appeals, participant welfare, data, AI, and the World Hackathon Championship.',
  alternates: { canonical: '/rulebook' },
  openGraph: {
    title: 'WHF Rulebook | Official Hackathon Rules and Statutes',
    description: 'The public WHF framework for fair competition, transparent judging, participant welfare, and internationally comparable hackathons.',
    url: `${siteConfig.url}/rulebook`,
    images: [{ url: '/favicon.jpg', width: 600, height: 600, alt: 'World Hackathon Federation logo' }],
  },
}

export default function RulebookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
