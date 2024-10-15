import Link from "next/link"
import { Home, List, NotebookTabs, Settings, Users } from "lucide-react"

import { UserDropdown } from "./user-dropdown"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "/dashboard/posts",
    icon: NotebookTabs,
    label: "Posts",
  },
  {
    href: "/dashboard/categories",
    icon: List,
    label: "Categories",
  },
  {
    href: "/dashboard/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive(item.href) && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 space-y-4">
        <UserDropdown />
      </div>
    </>
  )
}
