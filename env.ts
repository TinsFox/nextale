import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_TIPTAP_APP_ID: z.string().min(1),
    NEXT_PUBLIC_TIPTAP_TOKEN: z.string().min(1),
    NEXT_PUBLIC_TIPTAP_APP_CONVERT_APP_ID: z.string().min(1),
    NEXT_PUBLIC_TIPTAP_APP_CONVERT_TOKEN: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TIPTAP_APP_ID: process.env.NEXT_PUBLIC_TIPTAP_APP_ID,
    NEXT_PUBLIC_TIPTAP_TOKEN: process.env.NEXT_PUBLIC_TIPTAP_TOKEN,
    NEXT_PUBLIC_TIPTAP_APP_CONVERT_APP_ID:
      process.env.NEXT_PUBLIC_TIPTAP_APP_CONVERT_APP_ID,
    NEXT_PUBLIC_TIPTAP_APP_CONVERT_TOKEN:
      process.env.NEXT_PUBLIC_TIPTAP_APP_CONVERT_TOKEN,
  },
})
