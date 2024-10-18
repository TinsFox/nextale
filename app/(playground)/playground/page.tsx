"use client"

import { useState } from "react"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"
// import { Command } from "cmdk"
import { DayPicker } from "react-day-picker"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
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
          {/* <TiptapEditor editor={editor} /> */}
          <CommandDemo></CommandDemo>
        </div>
      </div>
    </main>
  )
}
const list = [
  {
    value: 30,
    label: "关于尤雨溪的新公司，你需要知道的",
  },
  {
    value: 29,
    label: "真的假的",
  },
  {
    value: 28,
    label: "用来测试",
  },
  {
    value: 27,
    label: "用来测试",
  },
  {
    value: 26,
    label: "用来测试",
  },
  {
    value: 25,
    label: "My first post",
  },
  {
    value: 24,
    label: "My first post",
  },
  {
    value: 23,
    label: "My first post",
  },
  {
    value: 22,
    label: "My first post",
  },
  {
    value: 21,
    label: "1123",
  },
]
export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {list.map((p) => (
            <CommandItem key={p.value} value={String(p.value)}>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>{p.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
