"use client"

import Link from "next/link"
import { Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

import { deleteProject } from "@/lib/api/admin/projects"
import { useProjects } from "@/hooks/query/use-projects"
import { buttonVariants } from "@/components/ui/button"

import { createColumns } from "./columns"
import { DataTable } from "./data-table"

export function ProjectMain() {
  const { data: projects, isLoading } = useProjects()

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id)
      toast("项目已成功删除")
    } catch (error) {
      toast("删除项目时发生错误")
    }
  }

  const columns = createColumns({
    onEdit: () => {},
    onDelete: handleDelete,
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/projects/new"
        >
          <Plus className="mr-2 h-4 w-4" /> 新增项目
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={projects} />
      )}
    </div>
  )
}
