import { env } from "@/env"

export async function getCategories() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`)
  return res.json()
}
