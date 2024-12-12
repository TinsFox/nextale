import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api-fetch"
import { IApiPaginationResponse } from "@/lib/api/config"
import { IPost } from "@/lib/schema/post.schema"

export function usePosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiFetch<IApiPaginationResponse<IPost[]>>("/api/posts/s"),
  })

  return {
    posts: data?.data.records || [],
    isLoading,
  }
}
