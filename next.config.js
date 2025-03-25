/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['images.unsplash.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/flights',
        permanent: true,
      },
    ];
  },
  // Make sure all pages are dynamically rendered at request time
  experimental: {
    serverActions: true,
  },
  // Disable static optimization for now
  staticPageGenerationTimeout: 0,
};

module.exports = nextConfig;
