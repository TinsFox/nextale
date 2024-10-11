"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Users2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

const navItems = [
  {
    href: "/",
    icon: Home,
    label: "Home",
  },
  {
    href: "/dashboard/overview",
    icon: LineChart,
    label: "Overview",
  },
  {
    href: "/dashboard/post-list",
    icon: ShoppingCart,
    label: "Post List",
  },
  {
    href: "/dashboard/tags",
    icon: Package,
    label: "Tags",
  },
  {
    href: "/dashboard/categories",
    icon: Users2,
    label: "Categories",
  },
  {
    href: "/dashboard/users",
    icon: LineChart,
    label: "Users",
  },
]

export function Aside() {
  const { isExpanded, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <motion.aside
      className="fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background sm:flex "
      initial={{ width: "3.5rem" }}
      animate={{ width: isExpanded ? "14rem" : "3.5rem" }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {navItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex h-9 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
                  isExpanded && "justify-start px-3",
                  isActive(item.href) && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 min-w-[1.25rem]" />
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="ml-3"
                  >
                    {item.label}
                  </motion.span>
                )}
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
                isExpanded && "justify-start px-3"
              )}
            >
              <Settings className="h-5 w-5 min-w-[1.25rem]" />
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="ml-3"
                >
                  Settings
                </motion.span>
              )}
              {!isExpanded && <span className="sr-only">Settings</span>}
            </Link>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right">Settings</TooltipContent>
          )}
        </Tooltip>
      </nav>
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-background border border-border shadow"
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </motion.aside>
  )
}
