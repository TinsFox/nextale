import { env } from "@/env"

export const fetchPosts = async () => {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts`)
  const posts = await res.json()
  return posts
}

export async function fetchPostDetail(slug: string) {
    const post = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
  return post.json()
}