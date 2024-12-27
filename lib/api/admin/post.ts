import { env } from "@/env"
import { IPost } from "@/lib/schema/post.schema"
import { fetcher } from "../fetcher"
import { APIResponse } from "@/lib/api-fetch"

export async function fetchPostDetail(slug: string) {
  const post = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/s/${slug}`)
  const res = (await post.json()) as APIResponse<IPost>
  return res.data
}

export async function publishPost(post: IPost) {
  return await fetcher(`/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
