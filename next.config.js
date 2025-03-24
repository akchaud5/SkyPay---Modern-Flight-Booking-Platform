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
};

module.exports = nextConfig;
