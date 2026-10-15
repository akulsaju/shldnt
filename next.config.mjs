/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/reimbursement-frame/:path*',
        destination: 'https://hcb.hackclub.com/:path*',
      },
      {
        source: '/reimbursement/:path*',
        destination: 'https://hcb.hackclub.com/reimbursement/:path*',
      },
      {
        source: '/storage/:path*',
        destination: 'https://hcb.hackclub.com/storage/:path*',
      },
      {
        source: '/brand/:path*',
        destination: 'https://hcb.hackclub.com/brand/:path*',
      },
      {
        source: '/site.webmanifest',
        destination: 'https://hcb.hackclub.com/site.webmanifest',
      },
      {
        source: '/apple-touch-icon.png',
        destination: 'https://hcb.hackclub.com/apple-touch-icon.png',
      },
      {
        source: '/safari-pinned-tab.svg',
        destination: 'https://hcb.hackclub.com/safari-pinned-tab.svg',
      },
    ]
  },
}

export default nextConfig
