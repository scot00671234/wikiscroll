/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['upload.wikimedia.org'],
  },
  swcMinify: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Disable SWC entirely to avoid download issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'swc']
    }
    return config
  },
}

module.exports = nextConfig
