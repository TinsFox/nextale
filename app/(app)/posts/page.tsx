import { Metadata } from "next"

import { fetchPosts } from "@/lib/api/post"

import { PostList } from "./components/post-list"

export const metadata: Metadata = {
  title: "博客文章 | 我的网站",
  description: "浏览我的最新博客文章，涵盖各种有趣的主题和见解。",
  openGraph: {
    title: "博客文章 | 我的网站",
    description: "浏览我的最新博客文章，涵盖各种有趣的主题和见解。",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "博客文章列表封面图",
      },
    ],
  },
}

export default async function Posts() {
  const posts = await fetchPosts()

  return (
    <div>
      <div className="mb-6 p-4">
        <h1 className="text-2xl font-bold">博客文章</h1>
      </div>
      <PostList posts={posts.records} />
    </div>
  )
}
