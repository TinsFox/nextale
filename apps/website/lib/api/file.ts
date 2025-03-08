export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  const response = await fetch("/api/file", {
    method: "POST",
    body: formData,
  })
  const json = await response.json()
  return json.data.fileUrl
}
