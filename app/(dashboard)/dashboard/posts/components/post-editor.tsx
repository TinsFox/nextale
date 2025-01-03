"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { IPost, postFormSchema } from "@/lib/schema/post.schema"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MinimalTiptapEditor } from "@/components/minimal-tiptap"

import { AdvancedForm } from "./advanced-form"
import { BasicForm } from "./basic-form"
import { SettingForm } from "./setting-form"

export function PostEditor({ slug, post }: { slug: string; post?: IPost }) {
  const router = useRouter()

  const [isPendingSaving, startTransitionSaving] = useTransition()

  const form = useForm<IPost>({
    resolver: zodResolver(postFormSchema),
    values: post,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const handleSave = async () => {
    startTransitionSaving(async () => {
      form.handleSubmit(onSubmit)()
    })
  }
  useHotkeys("meta+s, ctrl+enter", handleSave, {
    preventDefault: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
  })
  const leftSidebar = useSidebar()

  const onSubmit = async (data: IPost) => {
    try {
      const url = slug === "create" ? "/api/posts" : `/api/posts/${slug}`
      const res = await fetch(url, {
        method: slug === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
      })

      if (res.status !== 200) {
        toast.error("保存文章失败")
        return
      }
      toast.success(`${slug === "create" ? "创建" : "更新"}文章成功`)
      router.refresh()
    } catch (error) {
      console.error("Error saving post:", error)
      toast.error("保存文章失败")
    }
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            onKeyPress={handleKeyPress}
          >
            <div className="flex flex-col h-screen p-8 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="起个标题吧~"
                            className="text-lg font-semibold md:text-2xl shadow-none w-full border-0 border-b rounded-none focus-visible:ring-0 focus:border-primary hover:border-primary/50 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={leftSidebar.toggle}
                        >
                          {leftSidebar.isOpen ? (
                            <PanelLeftClose className="h-4 w-4" />
                          ) : (
                            <PanelLeft className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {leftSidebar.isOpen
                            ? "Close sidebar"
                            : "Open sidebar"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <AdvancedForm form={form} />
                    <SettingForm form={form} slug={slug} />
                    <Button
                      type="submit"
                      className="space-x-2"
                      disabled={isPendingSaving}
                    >
                      {isPendingSaving && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      保存
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <BasicForm form={form} />
                </div>
              </div>
              <div className="rounded-lg">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MinimalTiptapEditor
                          {...field}
                          immediatelyRender={false}
                          throttleDelay={0}
                          className={cn(
                            "min-h-56 w-full rounded-xl h-full overflow-auto shadow-sm flex-grow scroll-smooth",
                            {
                              "border-destructive focus-within:border-destructive":
                                form.formState.errors.content,
                            }
                          )}
                          editorContentClassName="overflow-auto h-full flex grow"
                          output="html"
                          placeholder="Type your post here..."
                          editable={true}
                          editorClassName="focus:outline-none px-5 py-4 h-full grow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
