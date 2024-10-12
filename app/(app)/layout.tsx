import type { Metadata } from "next"

import { Header } from "@/components/header"
import { appConfig } from "@/app.config"

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
    <div className="container min-h-screen flex flex-col mx-auto">
      <Header />
      {children}
    </div>
  )
}
