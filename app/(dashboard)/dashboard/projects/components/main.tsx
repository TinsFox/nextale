"use client"
import { useState } from "react"
import { useProjects } from "@/hooks/query/use-projects"
import { createColumns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProjectDialog } from "./project-dialog"
import { IProject } from "@/lib/schema/projects"

import { deleteProject } from "@/lib/api/admin/projects"
import { toast } from "sonner"

export function ProjectMain() {
  const { data: projects, isLoading } = useProjects()

  const [open, setOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<IProject | null>(null)


  const handleEdit = (project: IProject) => {
    setEditingProject(project)
    setOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id)
      toast("项目已成功删除")
    } catch (error) {
      toast("删除项目时发生错误")
    }
  }

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 新增项目
        </Button>
      </div>

      <DataTable columns={columns} data={projects || []} />

      <ProjectDialog
        open={open}
        onOpenChange={setOpen}
        project={editingProject}
        onClose={() => setEditingProject(null)}
      />
    </div>
  )
}