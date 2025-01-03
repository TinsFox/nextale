"use client"

import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MenuItem, navigationConfig } from "@/components/app-sidebar"

function getBreadcrumbs(pathname: string, items: MenuItem[]) {
  const parentPath = pathname.split("/").slice(0, 3).join("/")
  const currentItem = items.find((item) => item.url === parentPath)

  if (!currentItem) return null

  const breadcrumbs = [navigationConfig[0], currentItem].map((item) => ({
    title: item.title,
    href: item.url,
  }))

  if (currentItem.children?.pattern.test(pathname)) {
    breadcrumbs.push({
      title: currentItem.children.getTitle(pathname),
      href: pathname,
    })
  }

  return breadcrumbs
}

export function HeaderBreadcrumb() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname, navigationConfig)

  if (!breadcrumbs) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            {crumb.href ? (
              <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
