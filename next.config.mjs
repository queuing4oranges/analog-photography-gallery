/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api2.queuing4oranges.com",
      },
      {
        protocol: "https",
        hostname: "jpjxxivnalbhhpnuplkf.supabase.co",
      },
    ],
  },
};

export default nextConfig;
