import { useCallback, useEffect } from "react"
import {
  Content,
  HTMLContent,
  JSONContent,
  Editor as PrimitiveEditor,
  useEditor as usePrimitiveEditor,
} from "@tiptap/react"
import { cx } from "class-variance-authority"

import { testContent } from "@/lib/data/initialContent"

import { ExtensionKit } from "../extensions/extension-kit"

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
    extensions: ExtensionKit,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    content: initialContent,
    autofocus: "start",
    onCreate(props) {
      console.log("props: ", props)
      props.editor.commands.focus()
      props.editor.commands.setContent(testContent)
    },
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
