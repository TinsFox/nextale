import { fetchPosts } from "@/lib/api/post"
import { Post } from "@/types/post"

export const metadata = {
  title: "Posts",
  description: "文章列表",
}

//  TODO
// export async function generateStaticParams() {
//   const posts = await fetchPosts()
// }
export default async function Posts() {
  const posts = await fetchPosts()

  return (
    <div>
      <h1>Posts</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
      <ul>
        {posts.data.data.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
