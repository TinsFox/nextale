"use client"

import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor, type Extension } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { AlignmentTooolbar } from "@/components/shadcn-tiptap/toolbars/alignment"
import { BlockquoteToolbar } from "@/components/shadcn-tiptap/toolbars/blockquote"
import { BoldToolbar } from "@/components/shadcn-tiptap/toolbars/bold"
import { BulletListToolbar } from "@/components/shadcn-tiptap/toolbars/bullet-list"
import { CodeToolbar } from "@/components/shadcn-tiptap/toolbars/code"
import { CodeBlockToolbar } from "@/components/shadcn-tiptap/toolbars/code-block"
import { ColorHighlightToolbar } from "@/components/shadcn-tiptap/toolbars/color-and-highlight"
import { HardBreakToolbar } from "@/components/shadcn-tiptap/toolbars/hard-break"
import { HorizontalRuleToolbar } from "@/components/shadcn-tiptap/toolbars/horizontal-rule"
import { ItalicToolbar } from "@/components/shadcn-tiptap/toolbars/italic"
import { LinkToolbar } from "@/components/shadcn-tiptap/toolbars/link"
import { OrderedListToolbar } from "@/components/shadcn-tiptap/toolbars/ordered-list"
import { RedoToolbar } from "@/components/shadcn-tiptap/toolbars/redo"
import { SearchAndReplaceToolbar } from "@/components/shadcn-tiptap/toolbars/search-and-replace-toolbar"
import { StrikeThroughToolbar } from "@/components/shadcn-tiptap/toolbars/strikethrough"
import { ToolbarProvider } from "@/components/shadcn-tiptap/toolbars/toolbar-provider"
import { UnderlineToolbar } from "@/components/shadcn-tiptap/toolbars/underline"
import { UndoToolbar } from "@/components/shadcn-tiptap/toolbars/undo"

import { API } from "../tiptap/utils/api"
import { BorderTrail } from "./border-trail"
import { ImageExtension } from "./extensions/image"
import { ImagePlaceholder } from "./extensions/image-placeholder"
import { SearchAndReplace } from "./extensions/search-and-replace"
import { ImagePlaceholderToolbar } from "./toolbars/image-placeholder-toolbar"

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder.configure({
    onDrop: (files, editor) => {
      console.log(files, editor)
      files.forEach(async (file) => {
        const url = await API.uploadImage(file)
        editor.commands.insertImagePlaceholder()
        editor.chain().focus().setImage({ src: url }).run()
      })
    },
    onDropRejected: (files, editor) => {
      console.log(files, editor)
    },
    onEmbed: (url, editor) => {
      console.log(url, editor)
    },
  }),
  SearchAndReplace,
]

interface ShadcnTiptapProps {
  content?: string
  onContentChange?: (content: string) => void
  editable?: boolean
}
export const ShadcnTiptap = ({
  content,
  onContentChange,
  editable = false,
}: ShadcnTiptapProps) => {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content,
    immediatelyRender: false,
    editable,
    onUpdate({ editor }) {
      onContentChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }
  return (
    <div
      className={cn("relative rounded-md h-full flex-grow", {
        border: editable,
      })}
    >
      {editable && (
        <>
          <BorderTrail />
          <div
            className={cn(
              "flex w-full items-center py-2 px-2 justify-between border-b sticky top-0 left-0 bg-background z-20 overflow-x-auto",
              {
                "cursor-not-allowed": !editable,
              }
            )}
          >
            <ToolbarProvider editor={editor}>
              <div className="flex items-center gap-2">
                <UndoToolbar />
                <RedoToolbar />
                <Separator orientation="vertical" className="h-7" />
                <BoldToolbar />
                <ItalicToolbar />
                <LinkToolbar />
                <UnderlineToolbar />
                <BulletListToolbar />
                <OrderedListToolbar />
                <AlignmentTooolbar />
                <ImagePlaceholderToolbar />
                <ColorHighlightToolbar />
                <StrikeThroughToolbar />
                <HardBreakToolbar />
                <HorizontalRuleToolbar />
                <BlockquoteToolbar />
                <CodeToolbar />
                <CodeBlockToolbar />
              </div>
              <SearchAndReplaceToolbar />
            </ToolbarProvider>
          </div>
        </>
      )}
      <div
        onClick={() => {
          if (editable) {
            editor?.chain().focus().run()
            return
          }
        }}
        className="cursor-text min-h-[18rem] bg-background h-full flex-1"
      >
        <EditorContent className="outline-none" editor={editor} />
      </div>
    </div>
  )
}
