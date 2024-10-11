import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Loader2 } from "lucide-react"
import { Editor } from "@tiptap/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TiptapControlsProps {
  editor: Editor | null
  isLoading: boolean
  onImportClick: () => void
  onImportFilePick: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TiptapControls: React.FC<TiptapControlsProps> = ({
  editor,
  isLoading,
  onImportClick,
  onImportFilePick,
}) => {
  if (!editor) {
    return null
  }

  return (
    <div className="tiptap-controls flex items-center gap-1 p-1 bg-background border rounded-md mb-2">
      <Select
        onValueChange={(value) => {
          if (value === "paragraph") {
            editor.chain().focus().setParagraph().run()
          } else {
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6,
              })
              .run()
          }
        }}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="1">Heading 1</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
          <SelectItem value="4">Heading 4</SelectItem>
          <SelectItem value="5">Heading 5</SelectItem>
          <SelectItem value="6">Heading 6</SelectItem>
        </SelectContent>
      </Select>
      <ControlButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        tooltip="Bold"
      >
        B
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        tooltip="Italic"
      >
        I
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
        tooltip="Underline"
      >
        U
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        tooltip="Strike"
      >
        S
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        tooltip="Code"
      >
        {"</>"}
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        tooltip="Clear formatting"
      >
        A
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        tooltip="Bullet list"
      >
        •
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        tooltip="Ordered list"
      >
        1.
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        tooltip="Blockquote"
      >
        &ldquo;
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal rule"
      >
        —
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().undo().run()}
        // disabled={!editor.can().undo()}
        tooltip="Undo"
      >
        ↺
      </ControlButton>
      <ControlButton
        onClick={() => editor.chain().focus().redo().run()}
        // TODO: Fix redo
        // disabled={!editor.can().redo()}
        tooltip="Redo"
      >
        ↻
      </ControlButton>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onImportClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Import document</p>
        </TooltipContent>
      </Tooltip>
      <Input
        type="file"
        className="hidden"
        onChange={onImportFilePick}
        id="file-import"
      />
    </div>
  )
}

interface ControlButtonProps {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  tooltip: string
  children: React.ReactNode
}

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  active,
  disabled,
  tooltip,
  children,
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={active ? "default" : "outline"}
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className="w-8 h-8 p-0 text-xs"
      >
        {children}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
)
