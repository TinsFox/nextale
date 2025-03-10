import { useQuery } from "@tanstack/react-query"

import { fetchProjectDetail, getProjects } from "@/lib/api/admin/projects"

export function useProjects() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })

  return {
    data: data?.data || [],
    isLoading,
    refetch,
  }
}

export function useProject(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectDetail(id),
    enabled: !!id && !isNaN(id),
  })

  return {
    data: data?.data,
    isLoading,
  }
}
