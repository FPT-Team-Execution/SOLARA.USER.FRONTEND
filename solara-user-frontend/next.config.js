// next.config.js
const config = {
  reactStrictMode: false,
  distDir: 'build',
  output: 'standalone',
  images: {
    domains: ['psszjkdspnyifyjbmyau.supabase.co', 'bcp.cdnchinhphu.vn', 'images2.thanhnien.vn'],
  },
};

module.exports = config;
