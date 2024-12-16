"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { IProject } from "@/lib/schema/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ColumnProps {
  onEdit: (project: IProject) => void
  onDelete: (id: number) => void
}

export const createColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<IProject>[] => [
  {
    accessorKey: "name",
    header: "项目名称",
  },
  {
    accessorKey: "summary",
    header: "简介",
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge>{status}</Badge>
    },
  },
  {
    accessorKey: "techStack",
    header: "技术栈",
    cell: ({ row }) => {
      const techStack = row.getValue("techStack") as string[]

      if (!techStack?.length) {
        return <span className="text-muted-foreground text-sm">暂无</span>
      }

      const displayCount = 2 // 显示前两个技术栈
      const remainingCount = techStack.length - displayCount

      return (
        <div className="flex gap-1 items-center">
          {techStack.slice(0, displayCount).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary">+{remainingCount}</Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-popover p-2 rounded-md border shadow-md">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {techStack.slice(displayCount).map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(project)}>
              <Pencil className="mr-2 h-4 w-4" />
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(project.id)}>
              <Trash className="mr-2 h-4 w-4" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
