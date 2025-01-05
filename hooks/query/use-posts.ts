import { useQuery } from "@tanstack/react-query"

import { fetchPostDetail, fetchPosts } from "@/lib/api/admin/post"

export function usePosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  })

  return {
    data: data?.data.records || [],
    isLoading,
  }
}

export function usePost(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetail(id),
    enabled: !!id && !isNaN(id),
  })

  return {
    data: data?.data || {},
    isLoading,
  }
}
