import Image from "next/image"
import { format } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Suspense } from "react"
import { Calendar } from "lucide-react"

async function fetchPost(slug: string) {
  const post = await fetch(`http://localhost:8080/posts/${slug}`)
  return post.json()
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await fetchPost(params.slug)
  console.log(post.data.content)
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <time dateTime={post.data.customCreatedAt || post.data.createdAt}>
            {format(
              new Date(post.data.customCreatedAt || post.data.createdAt),
              "MMMM d, yyyy"
            )}
          </time>
          {post.data.tags?.length > 0 &&
            post.data.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="ml-4 bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
        </div>
        {post.data.coverImage && (
          <Image
            src={post.data.coverImage}
            alt={post.data.title}
            width={1200}
            height={630}
            className="rounded-lg shadow-lg"
          />
        )}
      </header>
      <article className="prose prose-lg max-w-none">
        <Suspense fallback={<>Loading...</>}>
          <MDXRemote source={post.data.content} />
        </Suspense>
      </article>

      {post.data.isCopyright && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} All rights reserved. This content is
            copyrighted.
          </p>
        </div>
      )}

      {post.data.relatedPosts?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <ul className="space-y-2">
            {post.data.relatedPosts.map((relatedPost: RelatedPosts) => (
              <li key={relatedPost.id}>
                <a
                  href={`/posts/${relatedPost.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {relatedPost.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export interface Post {
  id: number
  title: string
  content: string
  authorId: number
  coverImage: string
  tags: string[]
  isCopyright: boolean
  isTop: boolean
  topOrder: number
  summary: string
  customCreatedAt: string
  customUpdatedAt: string
  relatedPosts: RelatedPosts[]
  categoryIds: number[]
  tagIds: number[]
  slug: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
}
export interface RelatedPosts {
  id: number
  title: string
  slug: string
}
