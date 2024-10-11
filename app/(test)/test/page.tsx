"use client"


import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/tiptap"
import { initialContent } from "@/components/tiptap/initialContent"

export default function TestPage() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 lg:p-6">
        <h1 className="text-lg font-semibold md:text-2xl">Post Editor</h1>
        <Button onClick={() => console.log("content")}>Save Post</Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto rounded-lg border shadow-sm p-4">
          <TiptapEditor initialContent={initialContent} />
        </div>
      </div>
    </main>
  )
}
