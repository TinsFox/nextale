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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <PostList posts={posts.data.data} />
    </div>
  )
}
