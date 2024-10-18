export interface Post {
  id: number
  title: string
  content: string
  authorId: number
  coverImage: string
  tags: string[]
  isCopyright: boolean
  isTop: boolean
  topOrder: number
  summary: string
  customCreatedAt: string
  customUpdatedAt: string
  relatedPosts: RelatedPosts[]
  categoryIds: number[]
  tagIds: number[]
  slug: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface RelatedPosts {
  id: number
  title: string
  slug: string
}
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
  status: Status
  createdAt: string
  updatedAt: string
  deletedAt: string
}
