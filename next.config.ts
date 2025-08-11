/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig, ResolveOptions } from 'webpack';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  webpack: (config: WebpackConfig) => {
    if (config.resolve?.alias && !Array.isArray(config.resolve.alias)) {
      config.resolve.alias['canvas'] = false;
      config.resolve.alias['encoding'] = false;
    }
    return config;
  },
};

export default nextConfig;



