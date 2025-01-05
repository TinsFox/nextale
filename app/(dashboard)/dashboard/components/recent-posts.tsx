"use client"

import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { usePosts } from "@/hooks/query/use-posts"

export function RecentPosts() {
  const { data: posts } = usePosts()
  const recentPosts = posts?.slice(0, 5)

  if (!posts?.length) {
    return <p className="text-sm text-muted-foreground">No recent posts yet.</p>
  }

  return (
    <div className="space-y-2">
      {recentPosts?.map((post) => (
        <Link
          key={post.id}
          href={`/dashboard/posts/${post.id}`}
          className="block p-2 hover:bg-accent rounded-md"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{post.title}</span>
            <span className="text-xs text-muted-foreground">
              {formatDate(post.customCreatedAt || post.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
