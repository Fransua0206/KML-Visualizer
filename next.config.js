/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    apiURL: process.env.apiURL,
    apiServiceKey: process.env.apiServiceKey,
  },
};

module.exports = nextConfig;
