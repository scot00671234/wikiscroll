/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['upload.wikimedia.org'],
  },
  // Disable SWC minification for older Next.js
  swcMinify: false,
  // Environment variables
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
}

module.exports = nextConfig
