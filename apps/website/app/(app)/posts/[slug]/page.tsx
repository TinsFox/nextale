import { env } from "@/env"

import { PostViewer } from "@/components/post-viewer"
import NotFoundPost from "@/app/not-found"

async function fetchPost(slug: string) {
  const post = await fetch(`${env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
  return post.json()
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const post = await fetchPost(params.slug)

  if (post.statusCode === 404) {
    return {
      title: "Post not found",
      description: "Post not found",
    }
  }
  return {
    title: post.data.title,
    description: post.data.summary,
  }
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const post = await fetchPost(params.slug)
  if (!post) {
    return <NotFoundPost />
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <PostViewer post={post.data} />
    </main>
  )
}
