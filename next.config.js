/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    apiURL: process.env.apiURL,
    apiServiceKey: process.env.apiServiceKey,
  },
};

module.exports = nextConfig;
