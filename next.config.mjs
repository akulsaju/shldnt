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
    ]
  },
}

export default nextConfig
