import { apiFetch, APIResponse } from "@/lib/api-fetch"
import { IProject } from "@/lib/schema/projects"

export function getProjects() {
  return apiFetch<APIResponse<IProject[]>>("/api/projects/s")
}

export function createProject(data: IProject) {
  return apiFetch("/api/admin/projects", {
    method: "POST",
    body: data,
  })
}

export function updateProject(id: number, data: IProject) {
  return apiFetch(`/api/projects/${id}`, {
    method: "PATCH",
    body: data,
  })
}

export function deleteProject(id: number) {
  return apiFetch(`/api/admin/projects/${id}`, {
    method: "DELETE",
  })
}

export function getProject(id: number) {
  return apiFetch<APIResponse<IProject>>(`/api/projects/${id}`)
}
