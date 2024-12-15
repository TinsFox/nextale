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

  const presignedUrl: { url: string; publicUrl: string } = await apiFetch("/api/storage/presign", {
    method: "POST",
    body: JSON.stringify({
      fileName: key,
      contentType: options?.contentType || file.type,
    })
  })

  const response = await fetch(presignedUrl.url, {
    method: 'PUT',
    body: file,
    headers: {
      "Content-Type": options?.contentType || file.type
    }
  });

  if (!response.ok) {
    throw new Error("Failed to upload file")
  }

  return presignedUrl.publicUrl
}