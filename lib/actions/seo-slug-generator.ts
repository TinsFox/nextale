"use server"

import { env } from "@/env"
import OpenAI from "openai"

interface SeoSlug {
  slug: string
  seo_friendly: boolean
}
export async function seoSlugGenerator(title: string) {
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
    baseURL: env.OPENAI_BASE_URL,
  })

  try {
    const response = await openai.chat.completions.create({
      model: env.OPENAI_MODEL || "moonshot-v1-8k",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "你是一个有助于生成SEO友好的slug的助手。",
        },
        {
          role: "user",
          content: `为以下标题生成一个SEO友好的slug: "${title}"`,
        },
      ],
    })

    if (!response.choices[0].message.content) {
      return ""
    }
    const generatedSlug = JSON.parse(
      response.choices[0].message.content
    ) as SeoSlug
    return generatedSlug.slug
  } catch (error) {
    console.error("Error generating SEO slug:", error)
    return ""
  }
}
