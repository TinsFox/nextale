import type { Metadata } from "next"
import localFont from "next/font/local"

import { Header } from "@/components/header"
import { appConfig } from "@/app.config"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container min-h-screen flex flex-col mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
