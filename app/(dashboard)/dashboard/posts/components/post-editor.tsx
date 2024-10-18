"use client"

import { useCallback, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { isEmpty } from "lodash-es"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { IPost, postFormSchema } from "@/lib/schema/post.schema"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Loading from "@/components/loading"
import { TableOfContents } from "@/components/TableOfContents"
import { TiptapEditor } from "@/components/tiptap"
import { useTiptapEditor } from "@/components/tiptap/hooks/use-tiptap-editor"

import { AdvancedForm } from "./advanced-form"
import { BasicForm } from "./basic-form"
import { SettingForm } from "./setting-form"

const defaultValues: IPost = {
  id: undefined,
  title: "",
  slug: "",
  customCreatedAt: undefined,
  customUpdatedAt: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  content: "",
  coverImage: "",
  tags: [],
  category: "",
  status: "draft",
  isTop: false,
  topOrder: 0,
  summary: "",
  relatedPosts: [],
  isCopyright: true,
}
export function PostEditor({
  slug,
  pageTitle,
  post,
}: {
  slug: string
  pageTitle: string
  post: IPost
}) {
  const router = useRouter()

  const [isPendingSaving, startTransitionSaving] = useTransition()

  const form = useForm<IPost>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    values: {
      ...post,
      customCreatedAt: post?.customCreatedAt
        ? new Date(post?.customCreatedAt)
        : undefined,
      customUpdatedAt: post?.customUpdatedAt
        ? new Date(post?.customUpdatedAt)
        : undefined,
      createdAt: post?.customCreatedAt
        ? new Date(post?.customCreatedAt)
        : undefined,
      updatedAt: post?.customUpdatedAt
        ? new Date(post?.customUpdatedAt)
        : undefined,
    },
  })
  useEffect(() => {
    if (form.formState.errors && !isEmpty(form.formState.errors)) {
      console.log("form.formState.errors: ", form.formState.errors)
      toast.error(JSON.stringify(form.formState.errors))
    }
  }, [form.formState.errors])

  // listen to CMD + S ctrl+enter and override the default behavior
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

  const { editor } = useTiptapEditor({
    initialContent: post?.content ? JSON.parse(post?.content) : "",
    onJSONContentChange: (content) => {
      form.setValue("content", JSON.stringify(content))
      localStorage.setItem("postContent", JSON.stringify(content))
    },
  })

  const onSubmit = async (data: IPost) => {
    const content = form.getValues("content")
    if (isEmpty(content)) {
      toast.error("写点什么吧")
      return
    }
    try {
      console.log({ ...data, content })
      return
      const res = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, content }),
        credentials: "include",
      })
      // const data = await res.json()
      console.log("res: ", res)
      // await createOrUpdatePost({ ...data, content } as unknown as Post)
      toast.success("文章发布成功")
      // router.push(`/dashboard/posts`)
      router.refresh()
      // localStorage.removeItem("postContent")
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
  const handlePotentialClose = useCallback(() => {
    if (window.innerWidth < 1024) {
      leftSidebar.close()
    }
  }, [leftSidebar])
  if (!editor) return <Loading />

  return (
    <main className="flex flex-col h-screen p-8 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          onKeyPress={handleKeyPress}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
            </div>
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
                  <p>{leftSidebar.isOpen ? "Close sidebar" : "Open sidebar"}</p>
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
        </form>
      </Form>
      <div className="flex-1 overflow-hidden flex border rounded-lg">
        <div className="h-full overflow-auto shadow-sm flex-grow scroll-smooth">
          <TiptapEditor editor={editor} wrapperClassName="px-12" />
        </div>
        <div
          className={cn(
            "duration-300 transition-all h-full p-6 overflow-auto scroll-smooth",
            {
              "w-80 border-r border-r-neutral-200 dark:border-r-neutral-800":
                leftSidebar.isOpen,
              "w-0 p-0 border-r-transparent": !leftSidebar.isOpen,
            }
          )}
        >
          {leftSidebar.isOpen && (
            <TableOfContents
              editor={editor}
              onItemClick={handlePotentialClose}
            />
          )}
        </div>
      </div>
    </main>
  )
}
