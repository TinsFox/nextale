"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { Eye, FilePenLine, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { revalidatePost } from "@/lib/actions/post"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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

const POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const

export const columns: ColumnDef<IPost>[] = [
  {
    accessorKey: "title",
    header: "标题",
    cell: ({ row }) => {
      const post = row.original
      return (
        <div className="flex items-center gap-2 group">
          <div className="invisible group-hover:visible gap-2 flex">
            <Link href={`/dashboard/posts/${post.id}`} target="_blank">
              <FilePenLine className="size-4" />
            </Link>
            <Link href={`/posts/${post.slug}`} target="_blank">
              <Eye className="size-4" />
            </Link>
          </div>
          <p>{post.title}</p>
        </div>
      )
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
    cell: ({ row, table }) => {
      const post = row.original
      const handleStatusChange = async (newStatus: string) => {
        try {
          const response = await fetch(`/api/posts/${post.id}/status`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          })

          if (!response.ok) {
            throw new Error("Failed to update status")
          }

          // 刷新表格数据
          revalidatePost(post.slug)
          toast.success("状态更新成功")
        } catch (error) {
          toast.error("状态更新失败")
          console.error(error)
        }
      }

      return (
        <Select value={post.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue>
              {post.status === POST_STATUS.DRAFT && "草稿"}
              {post.status === POST_STATUS.PUBLISHED && "已发布"}
              {post.status === POST_STATUS.ARCHIVED && "已归档"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={POST_STATUS.DRAFT}>草稿</SelectItem>
            <SelectItem value={POST_STATUS.PUBLISHED}>已发布</SelectItem>
            <SelectItem value={POST_STATUS.ARCHIVED}>已归档</SelectItem>
          </SelectContent>
        </Select>
      )
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
    accessorKey: "updatedAt",
    header: "更新时间",
    cell: ({ row }) => {
      const post = row.original
      return <div>{formatDate(post.updatedAt, "yyyy-MM-dd HH:mm:ss")}</div>
    },
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
