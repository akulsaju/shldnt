import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About the World Hackathon Federation',
  description: 'Learn how the World Hackathon Federation connects national hackathon communities through fair rules, transparent governance, and a global championship pathway.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About the World Hackathon Federation',
    description: 'The mission, principles, and global network behind the World Hackathon Federation.',
    url: `${siteConfig.url}/about`,
  },
}

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
