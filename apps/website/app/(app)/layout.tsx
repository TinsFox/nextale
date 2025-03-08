import type { Metadata } from "next"
import { appConfig } from "@/app.config"
import { env } from "@/env"

import { getSiteConfig } from "@/lib/api/config"
import { Header } from "@/components/header"

export const generateMetadata = async (): Promise<Metadata> => {
  const { theme } = await getSiteConfig()

  if (!theme) {
    return {
      title: appConfig.title,
      description: appConfig.description,
    }
  }

  const { site, seo, user } = theme

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    title: {
      template: `%s | ${seo.title || appConfig.title}`,
      default: `${seo.title || appConfig.title} - ${seo.description || appConfig.description}`,
    },
    description: seo.description,
    keywords: seo.keywords?.join(",") || "",
    icons: [
      {
        url: site.favicon,
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: site.favicon,
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: site.faviconDark || site.favicon,
        media: "(prefers-color-scheme: dark)",
      },
    ],

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: {
        default: seo.title,
        template: `%s | ${seo.title}`,
      },
      description: seo.description,
      siteName: `${seo.title}`,
      locale: "zh_CN",
      type: "website",
      url: env.NEXT_PUBLIC_URL,
      images: {
        url: `${env.NEXT_PUBLIC_URL}/og`,
        username: user.username,
      },
    },
    twitter: {
      creator: `@${user.socialIds?.twitter || user.socialIds?.x}`,
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  } satisfies Metadata
}
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col relative mx-auto">
      <Header />
      {children}
    </div>
  )
}
