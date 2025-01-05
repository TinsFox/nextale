import { env } from "@/env"
import { apiFetch } from "../api-fetch"
import { IPostDetail } from "../schema/post.schema"
import { IApiPaginationResponse } from "./config"

export const fetchPosts = async () => {
  const res = await apiFetch<{
    code: number
    data: IApiPaginationResponse<IPostDetail>
    message: string
  }>(`${env.NEXT_PUBLIC_API_URL}/api/posts`)
  console.log(`${env.NEXT_PUBLIC_API_URL}/api/posts`);
  if (res.code !== 200) {
    throw new Error("Failed to fetch posts")
  }

  return res.data
}

export async function fetchPostDetail(id: string | number) {
  return apiFetch(`/api/posts/${id}`, {
    method: "GET",
  })
}
