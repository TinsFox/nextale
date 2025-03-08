"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  value?: string[]
  onChange: (tags: string[]) => void
  className?: string
}

export function TagInput({ value, onChange, className }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")

  const addTag = () => {
    if (inputValue.trim() !== "" && !value?.includes(inputValue.trim())) {
      onChange([...(value || []), inputValue.trim()])
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value?.filter((tag) => tag !== tagToRemove) || [])
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {value?.map((tag) => (
        <div
          key={tag}
          className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm"
        >
          {tag}
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-5 w-5 p-0"
            onClick={() => removeTag(tag)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            addTag()
          }
        }}
        className="flex-1"
        placeholder="Add a tag..."
      />
    </div>
  )
}
