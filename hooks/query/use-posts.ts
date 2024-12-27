import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api-fetch"
import { IApiPaginationResponse, IApiResponse } from "@/lib/api/config"
import { IPost } from "@/lib/schema/post.schema"

export function usePosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiFetch<IApiResponse<IApiPaginationResponse<IPost>>>("/api/posts/s"),
  })


  return {
    data: data?.data.records || [],
    isLoading,
  }
}
