import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NHA Portal',
  description: 'Secure workspace for recognized National Hackathon Associations.',
  robots: { index: false, follow: false, nocache: true },
}

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
