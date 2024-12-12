import { format, formatDistance, formatRelative, subDays } from "date-fns"
import { Link } from "next-view-transitions"

import { Post } from "@/types/post"

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="space-y-6 animate-in fade-in duration-500 ">
      {posts.map((post: Post) => (
        <li
          key={post.id}
          className="rounded-xl min-w-96 px-4 py-6 hover:bg-gray-50 pb-6 last:border-b-0 animate-in slide-in-from-bottom-4 duration-300 group"
        >
          <Link href={`/posts/${post.slug || post.id}`}>
            <h2 className="text-xl font-semibold mb-2 transition-colors">
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
