/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  images: {
    domains: ['upload.wikimedia.org'],
  },
  async rewrites() {
    return [
      {
        source: '/api/wikipedia/:path*',
        destination: 'https://en.wikipedia.org/api/rest_v1/:path*',
      },
    ];
  },
}

module.exports = nextConfig
