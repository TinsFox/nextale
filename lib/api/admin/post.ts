import { env } from "@/env"
import { IPost } from "@/lib/schema/post.schema"
import { apiFetch, APIResponse } from "@/lib/api-fetch"

export async function fetchPostDetail(slug: string) {
  const post = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/s/${slug}`)
  const res = (await post.json()) as APIResponse<IPost>
  return res.data
}

export async function publishPost(post: IPost) {
  return await apiFetch(`/api/posts`, {
    method: "POST",
    body: post,
  })
}

export async function createPost(post: IPost) {
  return await apiFetch(`/api/posts`, {
    method: "POST",
    body: post,
  })
}

export async function updatePost(post: IPost) {
  return await apiFetch(`/api/posts/${post.id}`, {
    method: "PATCH",
    body: post,
  })
}
