import { apiFetch, APIResponse } from "@/lib/api-fetch"
import { IProject } from "@/lib/schema/projects"

export function getProjects() {
  return apiFetch<APIResponse<IProject[]>>("/api/projects/s")
}

export async function createProject(data: IProject) {
  const response = await fetch("/api/admin/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create project")
  }

  return response.json()
}

export async function updateProject(id: number, data: IProject) {
  const response = await fetch(`/api/admin/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update project")
  }

  return response.json()
}

export async function deleteProject(id: number) {
  const response = await fetch(`/api/admin/projects/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete project")
  }

  return response.json()
}