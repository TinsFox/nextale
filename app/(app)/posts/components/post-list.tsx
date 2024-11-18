import { Link } from "next-view-transitions"

import { Post } from "@/types/post"

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="space-y-6 animate-in fade-in duration-500">
      {posts.map((post: Post) => (
        <li
          key={post.id}
          className="border-b border-gray-200 pb-6 last:border-b-0 animate-in slide-in-from-bottom-4 duration-300"
        >
          <Link href={`/posts/${post.slug || post.id}`} className="group">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{post.summary ?? ""}</p>
            <span className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
