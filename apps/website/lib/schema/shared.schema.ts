import * as z from "zod"

export const statusSchema = z
  .enum(["draft", "published", "archived", "under_review"])
  .default("draft")


export type Status = z.infer<typeof statusSchema>