import { apiFetch } from "@/lib/api-fetch"

export async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await apiFetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  return response.url
}