"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import { Post } from "@/types/post"

export async function createOrUpdatePost(post: Post) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (!token) {
    throw new Error("Unauthorized")
  }
  if (!post) {
    throw new Error("Post is required")
  }
  if (post.id) {
    const res = await fetch(`http://localhost:8080/posts/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        cookie: `token=${token.value}`,
      },
      credentials: "include",
    })
    revalidatePost(post.slug || post.id)
    const data = await res.json()
    return data
  } else {
    const res = await fetch(`http://localhost:8080/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        cookie: `token=${token.value}`,
      },
      credentials: "include",
    })
    revalidatePost(post.slug)
    const data = await res.json()
    return data
  }
}

export async function revalidatePost(slug: string | number) {
  return
  revalidatePath("/posts")
  revalidatePath(`/posts/${slug}`)

  revalidatePath("/dashboard/posts")
  // TODO maybe we should revalidate the post detail page
  revalidatePath(`/dashboard/posts/${slug}`)
}
