import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Hackathon Federation',
  description: 'The World Hackathon Federation creates a fair, open, and globally connected standard for hackathons.',
  generator: 'World Hackathon Federation',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
