import { useQuery } from "@tanstack/react-query"
import { Post } from "@/types/post"

async function fetchPosts(): Promise<Post[]> {
  // 这里应该是你的实际 API 调用
  const response = await fetch("/api/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export function usePosts() {
  const { data, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  return {
    // TODO: 这里需要优化
    data: data?.data.data,
    isLoading,
  }
}
