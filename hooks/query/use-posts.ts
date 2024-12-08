import { useQuery } from "@tanstack/react-query"

import { Post } from "@/types/post"

async function fetchPosts(): Promise<{
  data: Post[]
}> {
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
