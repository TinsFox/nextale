"use client"

import { Editor, EditorContent } from "@tiptap/react"

import "./styles/index.css"

import { useRef } from "react"

import { cn } from "@/lib/utils"

import { ImageBlockMenu } from "./extensions/ImageBlock/components/ImageBlockMenu"
import { ColumnsMenu } from "./extensions/MultiColumn/menus/ColumnsMenu"
import { TableColumnMenu, TableRowMenu } from "./extensions/Table/menus"
import { ContentItemMenu } from "./menus/content-item-menu"
import { LinkMenu } from "./menus/link-menu"
import { TextMenu } from "./menus/text-menu"

interface TiptapEditorProps {
  editor: Editor | null
  className?: string
  style?: React.CSSProperties
  wrapperClassName?: string
}

export const TiptapEditor = ({
  editor,
  className,
  wrapperClassName,
}: TiptapEditorProps) => {
  const menuContainerRef = useRef(null)
  if (!editor) {
    return null
  }

  return (
    <div className={cn("flex h-full", wrapperClassName)} ref={menuContainerRef}>
      <EditorContent
        editor={editor}
        className={cn("h-full w-full", className)}
      />
      {editor.isEditable && (
        <>
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </>
      )}
    </div>
  )
}
