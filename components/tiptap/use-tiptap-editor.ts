import { useCallback, useEffect } from "react"
import {
  Content,
  HTMLContent,
  JSONContent,
  Editor as PrimitiveEditor,
  useEditor as usePrimitiveEditor,
} from "@tiptap/react"
import { Import } from "@tiptap-pro/extension-import"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Code from "@tiptap/extension-code"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Superscript from "@tiptap/extension-superscript"
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TextStyle from "@tiptap/extension-text-style"
import HardBreak from "@tiptap/extension-hard-break"
import Heading from "@tiptap/extension-heading"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Image from "@tiptap/extension-image"
import OrderedList from "@tiptap/extension-ordered-list"
import Bold from "@tiptap/extension-bold"
import Highlight from "@tiptap/extension-highlight"
import Italic from "@tiptap/extension-italic"
import Strike from "@tiptap/extension-strike"
import { Color } from "@tiptap/extension-color"
import FileHandler from "@tiptap-pro/extension-file-handler"
import Underline from "@tiptap/extension-underline"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import ListItem from "@tiptap/extension-list-item"
import { env } from "@/env"
import suggestion from "./emoji/suggestion"
import Subscript from "@tiptap/extension-subscript"
import Gapcursor from "@tiptap/extension-gapcursor"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"

import Blockquote from "@tiptap/extension-blockquote"
import BulletList from "@tiptap/extension-bullet-list"
import CodeBlock from "@tiptap/extension-code-block"

import Details from "@tiptap-pro/extension-details"
import DetailsContent from "@tiptap-pro/extension-details-content"
import DetailsSummary from "@tiptap-pro/extension-details-summary"
import Document from "@tiptap/extension-document"
import { cx } from "class-variance-authority"

import { SlashCommand } from "./slash-command"

interface UseTiptapEditorProps {
  initialContent: Content
  onJSONContentChange?: (content: JSONContent) => void
  onHTMLContentChange?: (content: HTMLContent) => void
}

export function useTiptapEditor({
  initialContent = null,
  onJSONContentChange,
  onHTMLContentChange,
}: UseTiptapEditorProps) {
  const editor = usePrimitiveEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Type '/' for commands",
      }),
      BulletList,
      ListItem,
      Document,
      Paragraph,
      HardBreak,
      CodeBlock,
      Text,
      Code,
      Gapcursor,
      Heading,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      Superscript,
      Table,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      OrderedList,
      TableCell,
      TableHeader,
      TableRow,
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
        suggestion,
      }),
      Import.configure({
        appId: env.NEXT_PUBLIC_TIPTAP_APP_CONVERT_APP_ID,
        token: env.NEXT_PUBLIC_TIPTAP_APP_CONVERT_TOKEN,
      }),
      HorizontalRule,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextStyle,
      Subscript,
      Typography,
      Bold,
      Highlight,
      Italic,
      Strike,
      Color,
      Underline,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run()
            }
          })
        },
      }),
      Details,
      DetailsContent,
      DetailsSummary,
      Blockquote,
      SlashCommand,
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    content: initialContent,
    autofocus: "start",
    onUpdate: ({ editor }) => {},
    editorProps: {
      attributes: {
        class: cx("focus:outline-none min-h-full"),
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
      },
    },
  })

  const getContent = useCallback(() => {
    return editor?.getJSON() || null
  }, [editor])

  const handleSave = useCallback(() => {
    return getContent()
  }, [getContent])

  useEffect(() => {
    if (!editor) return

    const updateHandler = ({ editor }: { editor: PrimitiveEditor }) => {
      const jsonContent = editor.getJSON()
      const htmlContent = editor.getHTML()
      onJSONContentChange?.(jsonContent)
      onHTMLContentChange?.(htmlContent)
    }

    editor.on("update", updateHandler)

    return () => {
      editor.off("update", updateHandler)
    }
  }, [editor, onJSONContentChange, onHTMLContentChange])

  return {
    editor,
    getContent,
    handleSave,
  }
}
