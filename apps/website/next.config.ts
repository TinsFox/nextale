import type { NextConfig } from "next"

import { env } from "./env"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "nextale.cdn.tinsfox.com",
      },
      {
        protocol: "https",
        hostname: "assets.nextale.tinsfox.com",
      },
      {
        protocol: "https",
        hostname: "x.com",
      },
      {
        protocol: "https",
        hostname: "shadcnui-boilerplate.pages.dev",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/dashboard",
  //       destination: "/dashboard",
  //       permanent: true,
  //     },
  //   ]
  // },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
}

export default nextConfig
