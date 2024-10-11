"use client"

import { EditorContent, Editor } from "@tiptap/react"
import "./styles/index.css"
import { cn } from "@/lib/utils"

interface TiptapEditorProps {
  editor: Editor | null
  className?: string
  style?: React.CSSProperties
}

export const TiptapEditor = ({ editor, className }: TiptapEditorProps) => {
  if (!editor) {
    return null
  }

  return (
    <EditorContent editor={editor} className={cn("h-full w-full", className)} />
  )
}
