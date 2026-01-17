// Next.js Config

const nextConfig = {
  /* config options here */

  typescript: {
    // ignoreBuildErrors: false,
  },
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
};

export default nextConfig;
