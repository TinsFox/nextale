import { format } from "date-fns"
import { Link } from "next-view-transitions"

import { IPost } from "@/lib/schema/post.schema"

export const PostList = ({ posts }: { posts: IPost[] }) => {
  return (
    <ul className="space-y-3">
      {posts.map((post: IPost) => (
        <li
          key={post.id}
          className="p-4 rounded-lg transition-all hover:bg-gray-50/80 hover:border-gray-100 border border-transparent"
        >
          <Link href={`/posts/${post.slug || post.id}`} className="block">
            <h2 className="text-lg font-medium mb-1">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{post.summary ?? ""}</p>
            <span className="text-xs text-gray-400">
              {format(new Date(2014, 1, 11), "yyyy年 MM 月 dd 日 EEEE")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
