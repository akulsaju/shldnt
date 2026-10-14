import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'National Hackathon Association Directory',
  description: 'Browse the public World Hackathon Federation directory of national hackathon associations, country records, regions, and qualification status.',
  alternates: { canonical: '/members' },
  openGraph: {
    title: 'National Hackathon Association Directory',
    description: 'Explore country records and national hackathon association profiles in the WHF public registry.',
    url: `${siteConfig.url}/members`,
  },
}

export default function MembersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
