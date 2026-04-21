import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bihartechassociation.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "bptpia-api.onrender.com",
      },
    ],
  },
  // Allow API requests to backend during development
  // Temporarily disabled rewrites to avoid connection issues
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:5000/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
