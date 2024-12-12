export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-6 py-12 space-y-12 mx-auto flex flex-1">{children}</div>
  )
}
