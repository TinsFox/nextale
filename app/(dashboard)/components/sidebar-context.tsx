"use client"

import { useSidebarExpanded } from "@/atoms/dashboard-aside"
import React, { createContext, useContext, useEffect } from "react"

interface SidebarContextType {
  isExpanded: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useSidebarExpanded()

  const toggleSidebar = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
  }

  useEffect(() => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.style.marginLeft = isExpanded ? "14rem" : "3.5rem"
    }
  }, [isExpanded])

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
