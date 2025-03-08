import { apiFetch, APIResponse } from "@/lib/api-fetch"

export async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await apiFetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  return response.url
}

export async function uploadToObjectStorage(
  file: File,
  options?: {
    path?: string
    contentType?: string
  }
) {
  const timestamp = Date.now()
  const fileName = file.name
  const key = options?.path
    ? `${options.path}/${timestamp}-${fileName}`
    : `${timestamp}-${fileName}`

  const presignedUrl = await apiFetch<
    APIResponse<{ presignedUrl: string; publicUrl: string }>
  >("/api/file/s3/presign", {
    method: "POST",
    body: JSON.stringify({
      fileName: key,
      contentType: options?.contentType || file.type,
    }),
  })
  if (presignedUrl.code !== 200) {
    throw new Error(presignedUrl.message)
  }


  const response = await fetch(presignedUrl.data.presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": options?.contentType || file.type,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to upload file")
  }

  return presignedUrl.data.publicUrl
}
