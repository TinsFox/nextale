import * as motion from "framer-motion/client"
import { Link } from "next-view-transitions"

import { Post } from "@/types/post"

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {posts.map((post: Post) => (
        <motion.li
          key={post.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-b border-gray-200 pb-6 last:border-b-0"
        >
          <Link href={`/posts/${post.slug || post.id}`} className="group">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {post.summary || "暂无摘要"}
            </p>
            <span className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}
