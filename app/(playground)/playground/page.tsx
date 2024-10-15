"use client"

import { useState } from "react"
import { DayPicker } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/tiptap"
import { useTiptapEditor } from "@/components/tiptap/hooks/use-tiptap-editor"
import { UserDropdown } from "@/app/(dashboard)/components/user-dropdown"

const testData = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [{ type: "text", text: "ppp" }],
    },
  ],
}

export default function TestPage() {
  const [selected, setSelected] = useState<Date>()
  const { editor } = useTiptapEditor({
    initialContent: testData || "",
    onJSONContentChange: (content) => {
      console.log("content: ", content)
    },
  })
  return (
    <main className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 lg:p-6">
        <h1 className="text-lg font-semibold md:text-2xl">Post Editor</h1>
        <Button onClick={() => console.log("content")}>Save Post</Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto rounded-lg border shadow-sm p-4">
          <div className="flex flex-col gap-4">
            <h1>Date Picker</h1>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              footer={
                selected
                  ? `Selected: ${selected.toLocaleDateString()}`
                  : "Pick a day."
              }
            />
          </div>
          <UserDropdown />
          <TiptapEditor editor={editor} />
        </div>
      </div>
    </main>
  )
}
