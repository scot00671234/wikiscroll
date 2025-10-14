/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['upload.wikimedia.org'],
  },
  // Disable SWC minification to avoid Nixpacks build issues
  swcMinify: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable experimental features that might cause issues
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Environment variables for Nixpacks
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    NODE_OPTIONS: '--max-old-space-size=4096',
  },
}

module.exports = nextConfig
