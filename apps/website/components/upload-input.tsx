"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, Loader2, Upload, X } from "lucide-react"
import { Controlled as ControlledZoom } from "react-medium-image-zoom"
import { toast } from "sonner"

import "react-medium-image-zoom/dist/styles.css"

import { uploadToObjectStorage } from "@/lib/api/upload"
import { cn, isVideoFile } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UploadInputProps {
  value?: string
  onChange: (value: string) => void
  accept?: string

  maxSize?: number // 单位：MB
  placeholder?: string
  preview?: boolean
}

export function UploadInput({
  value,
  onChange,
  accept = "image/*,video/*",
  maxSize = 10,
  placeholder,
  preview = false,
}: UploadInputProps) {
  const [loading, setLoading] = useState(false)
  const [showZoom, setShowZoom] = useState(false)

  const validateFile = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`文件大小不能超过 ${maxSize}MB`)
      return false
    }

    if (accept) {
      const acceptTypes = accept.split(",").map((type) => type.trim())
      const fileType = file.type

      const isValidType = acceptTypes.some((type) => {
        if (type.endsWith("/*")) {
          return fileType.startsWith(type.replace("/*", ""))
        }
        return type === fileType
      })

      if (!isValidType) {
        toast.error("文件类型不支持")
        return false
      }
    }

    return true
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!validateFile(file)) {
      e.target.value = ""
      return
    }

    try {
      setLoading(true)

      const url = await uploadToObjectStorage(file)
      onChange(url)
      toast.success("上传成功")
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("上传失败，请重试")
    } finally {
      setLoading(false)
      e.target.value = ""
    }
  }

  const handleClear = () => {
    onChange("")
  }

  const PreviewContent = ({ src }: { src: string }) => {
    const isVideo = isVideoFile(src)

    if (isVideo) {
      return (
        <video
          src={src}
          controls
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const video = e.target as HTMLVideoElement
          }}
        />
      )
    }

    return (
      <ControlledZoom
        isZoomed={showZoom}
        onZoomChange={setShowZoom}
        zoomMargin={45}
        classDialog="z-50"
      >
        <Image
          src={src}
          alt="Preview"
          fill
          className="object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = "/placeholder-image.png"
          }}
        />
      </ControlledZoom>
    )
  }

  return (
    <div className="mt-2 w-full">
      {value ? (
        <div
          className={cn(
            "relative w-full rounded-lg overflow-hidden group",
            "border-2 border-dashed transition-colors",
            preview ? "aspect-video" : "h-52"
          )}
        >
          {preview ? (
            <PreviewContent src={value} />
          ) : (
            <Input
              value={value}
              readOnly
              className="h-full"
              placeholder={placeholder}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-2",
              preview
                ? "bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                : "bg-transparent"
            )}
          >
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = accept
                input.onchange = (e) => handleUpload(e as any)
                input.click()
              }}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span className="ml-2">更换</span>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleClear}
              disabled={loading}
            >
              <X className="w-4 h-4" />
              <span className="ml-2">移除</span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowZoom(true)}
            >
              <Eye className="w-4 h-4" />
              <span className="ml-2">预览</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <input
            type="file"
            id="file-upload"
            accept={accept}
            onChange={handleUpload}
            className="hidden"
            disabled={loading}
          />
          <label
            htmlFor="file-upload"
            className={cn(
              "relative w-full rounded-lg border-2 border-dashed",
              "flex flex-row items-center justify-center gap-2",
              "cursor-pointer hover:border-primary transition-colors",
              preview ? "aspect-video" : "h-52",
              loading && "pointer-events-none opacity-50"
            )}
          >
            {loading ? (
              <>
                <Loader2
                  className={cn(
                    "animate-spin",
                    preview ? "w-6 h-6" : "w-4 h-4"
                  )}
                />
                <p className="text-sm text-muted-foreground">上传中...</p>
              </>
            ) : (
              <>
                <Upload
                  className={cn("block", preview ? "w-6 h-6" : "w-4 h-4")}
                />
                {preview ? (
                  <p className="text-sm text-muted-foreground">{placeholder}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">{placeholder}</p>
                )}
              </>
            )}
          </label>
        </div>
      )}
    </div>
  )
}
