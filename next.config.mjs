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
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8090',
        pathname: '/media/images/**',
      },
      // ✅ Use a fallback hostname instead of env var (Next.js limitation)
      ...(process.env.NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL
        ? [
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
