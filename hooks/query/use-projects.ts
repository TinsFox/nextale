import { useQuery } from "@tanstack/react-query"

import { getProjects } from "@/lib/api/admin/projects"

export function useProjects() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })

  return {
    data: data?.data
  }
}
