"use client"

import Link from "next/link"
import { Bell, Home } from "lucide-react"

import { AuthProvider } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

import { Sidebar } from "./components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
                target="_blank"
              >
                <Home className="h-6 w-6" />
                <h1 className="">NexTale</h1>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="py-4">{children}</div>
        </div>
      </div>
    </AuthProvider>
  )
}
