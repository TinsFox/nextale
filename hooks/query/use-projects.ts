import { useQuery } from "@tanstack/react-query"

import { getProject, getProjects } from "@/lib/api/admin/projects"

export function useProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })

  return {
    data: data?.data || [],
    isLoading,
  }
}

export function useProject(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
    enabled: !!id && !isNaN(id),
  })

  return {
    data: data?.data,
    isLoading,
  }
}
