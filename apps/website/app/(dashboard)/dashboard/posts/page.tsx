import { PostList } from "./components/list"

export const metadata = {
  title: "文章列表",
  description: "文章列表",
}

export default async function PostListPage() {
  return (
    <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 space-y-2">
      <PostList />
    </main>
  )
}
