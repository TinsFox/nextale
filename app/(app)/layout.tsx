import type { Metadata } from "next"
import { appConfig } from "@/app.config"

import { Header } from "@/components/header"

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
    <div className="container min-h-screen flex flex-col mx-auto relative">
      <Header />
      {children}
    </div>
  )
}
