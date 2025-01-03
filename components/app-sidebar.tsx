"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  FolderKanban,
  Home,
  ListTree,
  LucideIcon,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserDropdown } from "@/app/(dashboard)/components/user-dropdown"

export type MenuItem = {
  title: string
  url: string
  icon: LucideIcon
  children?: {
    pattern: RegExp
    getTitle: (pathname: string) => string
  }
}

export const navigationConfig: MenuItem[] = [
  {
    title: "首页",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "文章",
    url: "/dashboard/posts",
    icon: FileText,
    children: {
      pattern: /^\/dashboard\/posts\/([^/]+)$/,
      getTitle: (pathname) => {
        const slug = pathname.split("/").pop()
        return slug === "create" ? "创建文章" : "编辑文章"
      },
    },
  },
  {
    title: "项目",
    url: "/dashboard/projects",
    icon: FolderKanban,
    children: {
      pattern: /^\/dashboard\/projects\/([^/]+)$/,
      getTitle: (pathname) => {
        const slug = pathname.split("/").pop()
        return slug === "create" ? "创建项目" : "编辑项目"
      },
    },
  },
  {
    title: "分类",
    url: "/dashboard/categories",
    icon: ListTree,
  },
  {
    title: "设置",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationConfig.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
