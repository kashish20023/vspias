/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin.html',
        permanent: false
      },
      {
        source: '/automation.html',
        destination: '/automation',
        permanent: false
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
