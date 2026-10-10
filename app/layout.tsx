import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Hackathon Federation',
  description: 'The World Hackathon Federation creates a fair, open, and globally connected standard for hackathons.',
  generator: 'World Hackathon Federation',
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

function MaintenanceNotice() {
  return (
    <aside className="maintenance-notice" role="status" aria-label="Website maintenance notice">
      <div className="maintenance-notice__inner">
        <span className="maintenance-notice__label">Website notice</span>
        <p>Website currently under maintenance through November 10 due to the qualification process and scheduled website maintenance.</p>
      </div>
    </aside>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MaintenanceNotice />
        <a id="mlh-trust-badge" className="mlh-trust-badge" href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank" rel="noreferrer">
          <img src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg" alt="Major League Hacking 2026 Hackathon Season" />
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
