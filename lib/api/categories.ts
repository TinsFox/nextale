import { fetcher } from "./fetcher"
import { env } from "@/env"
import { Category } from "@/types/category"

export async function getCategories() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`)
  return res.json()
}
