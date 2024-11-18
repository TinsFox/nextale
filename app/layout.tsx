import type { Metadata } from "next"
import localFont from "next/font/local"
import { ViewTransitions } from "next-view-transitions"

import "./styles/globals.css"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import Providers from "./providers"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "NexTale",
  description: "NexTale",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="zh-CN">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TooltipProvider>
            <Providers>
              <>{children}</>
              <Toaster />
            </Providers>
          </TooltipProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
