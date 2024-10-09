"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { Loading } from "@/components/loading"
import { Aside } from "./components/aside"
import { Header } from "./header"
function LoadingOrContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <TooltipProvider>
        <LoadingOrContent>{children}</LoadingOrContent>
      </TooltipProvider>
    </AuthProvider>
  )
}
