import * as z from "zod"
import { statusSchema } from "./shared.schema"

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  docsUrl: z.string(),
  previewUrl: z.string(),
  videoUrl: z.string(),
  summary: z.string(),
  previewImage: z.array(z.string()),
  readme: z.string(),
  order: z.number(),
  coverImage: z.string(),
  status: statusSchema,
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  techStack: z.array(z.string()).default([])
})

export type IProject = z.infer<typeof projectSchema>
