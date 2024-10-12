export interface Post {
  id?: number
  title: string
  content: string
  coverImage: string
  tags: string[]
  isCopyright: boolean
  isTop: boolean
  topOrder: number
  summary: string
  customCreatedAt: string
  customUpdatedAt: string
  relatedPosts: string[]
  category: string
  slug: string
  status: "draft" | "published"
}
