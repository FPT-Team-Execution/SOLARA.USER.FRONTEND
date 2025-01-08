// next.config.js
const config = {
  // Cấu hình của bạn
  reactStrictMode: false, // Tắt Strict Mode
  distDir: 'build',
  output: 'standalone',
  images: {
    domains: ['psszjkdspnyifyjbmyau.supabase.co'],
  },
};

module.exports = config;
