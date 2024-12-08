import { fetchPostDetail } from "@/lib/api/post"

import { PostEditor } from "../components/post-editor"

export default async function PostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { slug } = params
  const pageTitle = slug === "create" ? "创建文章" : "编辑文章"
  if (slug === "create") {
    return <PostEditor slug={slug} pageTitle={pageTitle} />
  }

  const post = await fetchPostDetail(slug)

  if (post.statusCode === 404) {
    return <div>Post not found</div>
  }
  if (!post && slug !== "create") {
    return <div>Loading...</div>
  }

  return <PostEditor slug={slug} pageTitle={pageTitle} post={post.data} />
}
