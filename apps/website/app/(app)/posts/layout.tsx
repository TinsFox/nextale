export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8 md:py-12">
      {children}
    </div>
  )
}
