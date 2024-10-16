import { useCallback, useEffect, useState } from "react"
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
  const [characters, setCharactersCount] = useState()

  const editor = usePrimitiveEditor({
    extensions: ExtensionKit,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    content: initialContent,
    autofocus: "start",
    onCreate(props) {
      const { editor } = props
      editor.commands.focus()
      editor.commands.setContent(testContent)
      const charactersCount = editor.storage.characterCount.characters()
      setCharactersCount(charactersCount)
      editor.commands.focus("start")
    },
    onUpdate(props) {
      console.log("onUpdate props: ", props)
      const { editor } = props
      const charactersCount = editor.storage.characterCount.characters()
      setCharactersCount(charactersCount)
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
      const charactersCount = editor.storage.characterCount.characters()
      setCharactersCount(charactersCount)
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
    charsCount: characters,
  }
}
