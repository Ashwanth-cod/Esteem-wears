import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.101", "esteemwears.in"],
  images: {
    domains: ["res.cloudinary.com"]
  },
};

export default nextConfig;
