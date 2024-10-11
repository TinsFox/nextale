"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { formatDate } from "date-fns"
// import { MDXRemote } from "next-mdx-remote/rsc"

export interface IPost {
  id: number
  title: string
  content: string
  authorId: number
  coverImage: string
  tags: any[]
  isCopyright: boolean
  isTop: boolean
  topOrder: number
  summary: string
  customCreatedAt: string
  customUpdatedAt: string
  relatedPosts: any[]
  categoryIds: any[]
  tagIds: any[]
  slug: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
}

export const columns: ColumnDef<IPost>[] = [
  {
    accessorKey: "title",
    header: "标题",
    cell: ({ row }) => {
      const post = row.original
      return <Link href={`/posts/${post.slug}`}>{post.title}</Link>
    },
  },
  {
    accessorKey: "content",
    header: "内容",
    cell: ({ row }) => {
      const post = row.original
      return (
        <div className="line-clamp-3 max-w-sm">
          {/* FIXME */}
          {/* <MDXRemote source={post.content} /> */}
          123
        </div>
      )
    },
  },
  {
    accessorKey: "coverImage",
    header: "封面",
    cell: ({ row }) => {
      const post = row.original
      return (
        post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            width={100}
            height={100}
          />
        )
      )
    },
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => {
      const post = row.original

      return <Badge>{post.status}</Badge>
    },
  },
  {
    accessorKey: "tags",
    header: "标签",
    cell: ({ row }) => {
      const post = row.original
      return (
        <div className="flex flex-wrap gap-2">
          {/* {post.tags.length > 0 ? (
            post.tags.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)
          ) : (
            <Badge>No tags</Badge>
          )} */}
          <Badge>No tags</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "isCopyright",
    header: "版权",
    cell: ({ row }) => {
      const post = row.original
      return <Switch checked={post.isCopyright} />
    },
  },
  {
    accessorKey: "isTop",
    header: "置顶",
    cell: ({ row }) => {
      const post = row.original
      return <Switch checked={post.isTop} />
    },
  },
  {
    accessorKey: "topOrder",
    header: "置顶顺序",
  },
  {
    accessorKey: "summary",
    header: "摘要",
  },
  {
    accessorKey: "relatedPosts",
    header: "相关文章",
  },
  {
    accessorKey: "categoryIds",
    header: "分类",
  },
  {
    accessorKey: "tagIds",
    header: "标签",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createdAt",
    header: "创建时间",
    cell: ({ row }) => {
      const post = row.original
      return <div>{formatDate(post.createdAt, "yyyy-MM-dd HH:mm:ss")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "更新时间",
    cell: ({ row }) => {
      const post = row.original
      return <div>{formatDate(post.updatedAt, "yyyy-MM-dd HH:mm:ss")}</div>
    },
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => {
      const post = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`./posts/${post.slug || post.id}`}>编辑</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>删除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
