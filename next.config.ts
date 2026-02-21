import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['next-auth', 'zod', '@react-spring/web'],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/globalnomad/**',
      },
    ],
  },
};

// export default nextConfig;

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true, // default!
})(nextConfig);
