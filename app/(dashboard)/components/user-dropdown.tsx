import Image from "next/image"
import { ChevronUp } from "lucide-react"

import { useUser } from "@/hooks/query/user-user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function UserDropdown() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Skeleton className="w-10 h-10" />
  if (!user) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2">
          <SidebarMenuButton className="h-auto">
            <Image
              src={user.data.avatar}
              width={18}
              height={18}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
            <h2 className="scroll-m-20">
              {user.data.name || user.data.username}
            </h2>
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user.data.name || user.data.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
