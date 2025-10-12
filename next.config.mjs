/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dq1z5gvyi71s7.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '167.99.47.158:8000/',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '167.99.47.158:8000/',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {

      
        protocol: 'http',
        hostname: '167.99.47.158',
        port: '8000',
        pathname: '/media/images/**',
      },
      // ✅ Use a fallback hostname instead of env var (Next.js limitation)
      ...(process.env.NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL
        ? [
            {
              protocol: 'http',
              hostname: new URL(process.env.NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL).hostname,
              pathname: '/media/images/**',
            },
            {
              protocol: 'https',
              hostname: new URL(process.env.NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL).hostname,
              pathname: '/media/images/**',
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
