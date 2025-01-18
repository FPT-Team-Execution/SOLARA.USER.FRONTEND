// next.config.js
const config = {
  reactStrictMode: false,
  distDir: 'build',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'psszjkdspnyifyjbmyau.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'bcp.cdnchinhphu.vn',
      },
      {
        protocol: 'https',
        hostname: 'images2.thanhnien.vn',
      },
      {
        protocol: 'https',
        hostname: 'toongadventure.vn',
      },
    ],
  },
};

module.exports = config;
