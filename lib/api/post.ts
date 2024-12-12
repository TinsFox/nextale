import { env } from "@/env"

import { Post } from "@/types/post"

import { APIResponse } from "../api-fetch"
import { IPost } from "../schema/post.schema"
import { fetcher } from "./fetcher"

export const fetchPosts = async () => {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/s`, {
    next: {
      tags: ["posts"],
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export async function fetchPostDetail(slug: string) {
  const post = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/s/${slug}`)
  const res = (await post.json()) as APIResponse<IPost>
  return res.data
}

export async function publishPost(post: Post) {
  return await fetcher(`/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
