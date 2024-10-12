import { toast } from "sonner"

export interface ApiResponse<T> {
  code: number
  data: {
    data: T
    meta: {
      pagination: {
        total: number
        page: number
        pageSize: number
        pageCount: number
      }
    }
  }
  message: string
}

interface FetcherOptions extends RequestInit {
  customHeaders?: Record<string, string>
}

export async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<{ data: T; meta: ApiResponse<T>["data"]["meta"] }> {
  const { customHeaders, ...fetchOptions } = options

  const headers = new Headers({
    "Content-Type": "application/json",
    ...customHeaders,
  })

  // Include credentials to send cookies
  fetchOptions.credentials = "include"

  const response = await fetch(endpoint, {
    ...fetchOptions,
    headers,
  })

  if (response.status === 401) {
    // 如果是在客户端环境，使用 window.location.href 进行重定向
    if (typeof window !== "undefined") {
      console.error("request url: ", endpoint)
      toast.error("登录已过期，请重新登录")
      // window.location.href = "/dashboard/login"
    }
    throw new Error("Unauthorized")
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || "An error occurred while fetching the data."
    )
  }
  const responseJson = await response.json()
  const { data } = responseJson

  return { data, meta: data.meta || {} }
}
