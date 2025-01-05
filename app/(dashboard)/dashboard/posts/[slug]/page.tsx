"use client"

import { useParams } from "next/navigation"
import { PostEditor } from "../components/post-editor"
import { usePost } from "@/hooks/query/use-posts"

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: post, isLoading } = usePost(Number(slug))

  if (slug === "create") {
    return <PostEditor slug={slug} />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>文章不存在</div>
      </div>
    )
  }

  return <PostEditor slug={slug} post={post} />
}
