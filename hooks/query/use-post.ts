import { useQueryClient } from "@tanstack/react-query"
import { Post } from "@/types/post"

export function usePosts() {
  const queryClient = useQueryClient()
  const postsQuery = queryClient.getQueryData<Post[]>(["posts"])

  return postsQuery
}
