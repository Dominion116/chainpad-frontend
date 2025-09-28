/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable to prevent double mounting issues
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  // Allow external domains for WalletConnect
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
