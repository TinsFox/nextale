"use client"

import { Suspense } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar } from "lucide-react"

import { Post, RelatedPosts } from "@/types/post"
import NotFoundPost from "@/app/not-found"

import { Copyright } from "../copyright"
import { ShadcnTiptap } from "../shadcn-tiptap"

export interface PostViewerProps {
  post: Post
}

export function PostViewer({ post }: PostViewerProps) {
  if (!post) return <NotFoundPost />
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="flex flex-wrap items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <time
            dateTime={post.customCreatedAt || post.createdAt}
            className="mr-4"
          >
            {format(
              new Date(post.customCreatedAt || post.createdAt),
              "MM/dd/yyyy"
            )}
          </time>
          {post.tags?.length > 0 &&
            post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="mr-2 mb-2 bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
        </div>
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        )}
      </div>
      <article className="max-w-none">
        <Suspense fallback={<>Loading...</>}>
          <ShadcnTiptap content={post.content} />
        </Suspense>
        {post.isCopyright && <Copyright />}

        {post.relatedPosts?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
            <ul className="space-y-2">
              {post.relatedPosts.map((relatedPost: RelatedPosts) => (
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
      </article>
    </>
  )
}
