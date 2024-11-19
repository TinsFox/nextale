import { useQuery } from "@tanstack/react-query"

import { Post } from "@/types/post"

async function fetchPosts(): Promise<{
  data: Post[]
}> {
  // 这里应该是你的实际 API 调用
  const response = await fetch("/api/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  const result = await response.json()
  return result.data
}

export function usePosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  return {
    data: data?.data,
    isLoading,
  }
}
