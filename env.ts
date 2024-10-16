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
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    OPENAI_BASE_URL: z.string().url().optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    OPENAI_MODEL: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TIPTAP_APP_ID: process.env.NEXT_PUBLIC_TIPTAP_APP_ID,
    NEXT_PUBLIC_TIPTAP_TOKEN: process.env.NEXT_PUBLIC_TIPTAP_TOKEN,
    NEXT_PUBLIC_TIPTAP_APP_CONVERT_APP_ID:
      process.env.NEXT_PUBLIC_TIPTAP_APP_CONVERT_APP_ID,
    NEXT_PUBLIC_TIPTAP_APP_CONVERT_TOKEN:
      process.env.NEXT_PUBLIC_TIPTAP_APP_CONVERT_TOKEN,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
  },
})
