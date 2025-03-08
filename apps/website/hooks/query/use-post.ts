import { IPost } from "@/lib/schema/post.schema"
import { useQueryClient } from "@tanstack/react-query"


export function usePosts() {
  const queryClient = useQueryClient()
  const postsQuery = queryClient.getQueryData<IPost[]>(["posts"])

  return postsQuery
}
