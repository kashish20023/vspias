/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin.html'
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/automation.html',
        destination: '/automation',
        permanent: false
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: false
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms',
        permanent: true
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
