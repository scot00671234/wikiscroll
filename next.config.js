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
  // Disable experimental features that might cause issues
  experimental: {},
}

module.exports = nextConfig
