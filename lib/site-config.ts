const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
  ?? 'http://localhost:3000'

export const siteConfig = {
  name: 'World Hackathon Federation',
  shortName: 'WHF',
  description: 'The World Hackathon Federation sets open, fair, and globally connected standards for competitive hackathons, national associations, and the World Hackathon Championship.',
  url: configuredSiteUrl.replace(/\/$/, '') === 'http://localhost:3000'
    ? 'https://worldhackathonfederation.tech'
    : configuredSiteUrl.replace(/\/$/, ''),
  keywords: [
    'World Hackathon Federation',
    'global hackathon federation',
    'international hackathon standards',
    'National Hackathon Association',
    'World Hackathon Championship',
    'hackathon rules',
    'competitive software engineering',
    'hackathon community',
  ],
  ledgerVersion: 'v0.4.2-beta',
  statutesVersion: 'v4.0',
  repositoryUrl: 'https://github.com/akulsaju/shldnt',
} as const

export const developerLinks = [
  { label: 'Documentation', href: '/rulebook' },
  { label: 'GitHub Repository', href: siteConfig.repositoryUrl, external: true },
  { label: 'API Reference', href: `${siteConfig.repositoryUrl}/blob/main/lib/championship-results.ts`, external: true },
  { label: 'Core Protocol Spec', href: '/rulebook#article-35' },
] as const
