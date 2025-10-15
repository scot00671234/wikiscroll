/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['upload.wikimedia.org'],
  },
  // Disable SWC minification to avoid download issues
  swcMinify: false,
  // Environment variables
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  // Enable App Router for Next.js 13.0.6
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
