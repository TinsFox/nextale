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
  summary: z.string().optional(),
  customCreatedAt: z.date().optional(),
  customUpdatedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  relatedPosts: z.array(z.string()).optional(),
  category: z.string().optional(),
  status: statusSchema,
})

export type IPost = z.infer<typeof postFormSchema>
