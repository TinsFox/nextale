"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { env } from "@/env"

import { IPost } from "../schema/post.schema"

export async function createOrUpdatePost(post: IPost) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (!token) {
    throw new Error("Unauthorized")
  }
  if (!post) {
    throw new Error("Post is required")
  }
  if (post.id) {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${post.id}`, {
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
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        cookie: `token=${token.value}`,
      },
      credentials: "include",
    })

    const data = await res.json()
    return data
  }
}

export async function revalidatePost(slug: string | number) {
  revalidatePath("/posts")
  revalidatePath(`/posts/${slug}`)

  revalidatePath("/dashboard/posts")
  // TODO maybe we should revalidate the post detail page
  revalidatePath(`/dashboard/posts/${slug}`)
}
