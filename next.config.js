/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['upload.wikimedia.org'],
  },
  // Completely disable SWC to avoid download issues
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  // Disable all experimental features
  experimental: {},
  // Environment variables
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  // Force use of Babel instead of SWC
  webpack: (config, { isServer }) => {
    // Disable SWC completely
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig
