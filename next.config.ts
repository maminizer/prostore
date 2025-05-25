import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  serverExternalPackages: ['pdf2json'], // updated from experimental.serverComponentsExternalPackages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '', // Optional, can be removed if not used
      },
    ],
  },
};

module.exports = nextConfig;