import { fetchPostDetail } from "@/lib/api/post"
import { PostEditor } from "../components/post-editor"

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const pageTitle = slug === "create" ? "创建文章" : "编辑文章"
  const post = await fetchPostDetail(slug)

  if (!post && slug !== "create") {
    return <div>Loading...</div>
  }

  return <PostEditor slug={slug} pageTitle={pageTitle} post={post.data} />
}
