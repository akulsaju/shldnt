import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date()

  return [
    { url: siteConfig.url, lastModified: updatedAt, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: updatedAt, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/members`, lastModified: updatedAt, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/news`, lastModified: updatedAt, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteConfig.url}/news/uae-vs-saudi-match`, lastModified: updatedAt, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/rulebook`, lastModified: updatedAt, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
