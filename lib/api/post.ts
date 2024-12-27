import { env } from "@/env"
import { apiFetch, APIResponse } from "../api-fetch"
import { IPost } from "../schema/post.schema"
import { IApiPaginationResponse } from "./config"
import { fetcher } from "./fetcher"

export const fetchPosts = async () => {
  const res = await apiFetch<{
    code: number
    data: IApiPaginationResponse<IPost>
    message: string
  }>(`${env.NEXT_PUBLIC_API_URL}/posts`)

  if (res.code !== 200) {
    throw new Error("Failed to fetch posts")
  }

  return res.data
}

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
