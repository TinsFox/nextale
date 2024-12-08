import type { Metadata } from "next"

import { fetchPostDetail } from "@/lib/api/post"

import { PostEditor } from "../components/post-editor"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  if (slug === "create") {
    return {
      title: "Create Post",
    }
  }
  const post = await fetchPostDetail(slug)

  return {
    title: post.title,
  }
}
export default async function PostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { slug } = params

  if (slug === "create") {
    return <PostEditor slug={slug} />
  }

  const post = await fetchPostDetail(slug)

  if (!post && slug !== "create") {
    return <div>Loading...</div>
  }

  return <PostEditor slug={slug} post={post} />
}
