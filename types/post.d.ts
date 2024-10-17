import { Category } from "./category"

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
  status: string
}

export interface Post {
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
  relatedPosts: RelatedPosts[]
  category: Category
  slug: string
  status: string
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
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  deletedAt: string
}
