import type { Editor } from "@tiptap/core"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME =
  "node-handles-selected-style"

export function isValidUrl(url: string) {
  return /^https?:\/\/\S+$/.test(url)
}
export const duplicateContent = (editor: Editor) => {
  const { view } = editor
  const { state } = view
  const { selection } = state

  editor
    .chain()
    .insertContentAt(
      selection.to,
      selection.content().content.firstChild?.toJSON(),
      {
        updateSelection: true,
      }
    )
    .focus(selection.to)
    .run()
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) {
    return str
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString()
    }
  } catch {
    return null
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function isVideoFile(filename: string): boolean {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"]
  const videoMimeTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
  ]

  // 检查文件扩展名
  const hasVideoExtension = videoExtensions.some((ext) =>
    filename.toLowerCase().endsWith(ext)
  )

  // 检查 MIME 类型（如果 URL 包含它）
  const hasVideoMimeType = videoMimeTypes.some((type) =>
    filename.toLowerCase().includes(type)
  )

  return hasVideoExtension || hasVideoMimeType
}
