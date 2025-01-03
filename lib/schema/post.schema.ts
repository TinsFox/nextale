import * as z from "zod"
import { statusSchema } from "./shared.schema"

export const postFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "标题不能为空" }),
  slug: z.string().optional(),
  content: z.string(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isCopyright: z.boolean().optional(),
  isTop: z.boolean().optional(),
  topOrder: z.number().optional(),
  summary: z.string().optional().nullable(),
  customCreatedAt: z.coerce.date().optional(),
  customUpdatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  relatedPosts: z.array(z.string()).optional(),
  category: z.string().optional(),
  status: statusSchema,
})
export const POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const
export type IPost = z.infer<typeof postFormSchema>
