import * as z from "zod"

export const statusSchema = z
  .enum(["draft", "published", "archived", "under_review"])
  .default("draft")

export type Status = z.infer<typeof statusSchema>

export const postFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "标题不能为空" }),
  slug: z.string().optional(),
  content: z.string(),
  coverImage: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  isCopyright: z.boolean().optional(),
  isTop: z.boolean().optional(),
  topOrder: z.number().optional(),
  summary: z.string().optional().nullable(),
  customCreatedAt: z.date().optional(),
  customUpdatedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  relatedPosts: z.array(z.string()).optional(),
  category: z.string().optional(),
  status: statusSchema,
})
export type IPost = z.infer<typeof postFormSchema>
