import { IPost, IPostDetail } from "@/lib/schema/post.schema"
import { apiFetch } from "@/lib/api-fetch"
import { IApiPaginationResponse, IApiResponse } from "../config"


export async function fetchPostDetail(id: string | number) {
  return await apiFetch(`/api/admin/posts/${id}`, {
    method: "GET",
  })
}

export async function publishPost(post: IPost) {
  return await apiFetch(`/api/posts`, {
    method: "POST",
    body: post,
  })
}

export async function createPost(post: IPost) {
  return await apiFetch(`/api/posts`, {
    method: "POST",
    body: post,
  })
}

export async function updatePost(post: IPost) {
  return await apiFetch(`/api/posts/${post.id}`, {
    method: "PATCH",
    body: post,
  })
}

export async function fetchPosts() {
  return await apiFetch<IApiResponse<IApiPaginationResponse<IPostDetail>>>(
    "/api/admin/posts",
    {
      method: "GET",
    }
  )
}
