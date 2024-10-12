import { Post } from "@/types/post"
import { fetcher } from "./fetcher"
import { env } from "@/env"

export const fetchPosts = async () => {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts`, {
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
  const post = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
  return post.json()
}

// 发布文章
export async function publishPost(post: Post) {
  return await fetcher(`/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
