import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
};

module.exports = {
  env: {
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
};

export default nextConfig;

module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['pdf2json'],
  },
  images: {
    domains: ['utfs.io'], // Add any other domains you're using here
  },
  // your other Next.js config options
};
