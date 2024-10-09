"use client"

import { AuthProvider, useAuth } from "@/lib/auth-context"
import { Loading } from "@/components/loading"
function LoadingOrContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return <>{children}</>
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <LoadingOrContent>{children}</LoadingOrContent>
    </AuthProvider>
  )
}
