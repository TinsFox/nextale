import { apiFetch, APIResponse } from "@/lib/api-fetch"
import { IProject } from "@/lib/schema/projects"

export function getProjects() {
  return apiFetch<APIResponse<IProject[]>>("/api/projects/s")
}

export async function createProject(data: IProject) {
  const response = await apiFetch("/api/admin/projects", {
    method: "POST",
    body: data,
  })

  if (!response.ok) {
    throw new Error("Failed to create project")
  }

  return response.json()
}

export async function updateProject(id: number, data: IProject) {
  const response = await apiFetch(`/api/projects/${id}`, {
    method: "PATCH",
    body: data,
  })
  return response
}

export async function deleteProject(id: number) {
  const response = await apiFetch(`/api/admin/projects/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete project")
  }

  return response.json()
}

export function getProject(id: number) {
  return apiFetch<APIResponse<IProject>>(`/api/projects/${id}`)
}
