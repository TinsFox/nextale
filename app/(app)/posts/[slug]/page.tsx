import { PostViewer } from "@/components/post-viewer"

async function fetchPost(slug: string) {
  const post = await fetch(`http://localhost:8080/posts/${slug}`)
  return post.json()
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await fetchPost(params.slug)
  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await fetchPost(params.slug)
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PostViewer post={post.data} />
    </main>
  )
}
