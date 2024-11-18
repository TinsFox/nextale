"use client"

import { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { isEmpty } from "lodash-es"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { IPost, postFormSchema } from "@/lib/schema/post.schema"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ShadcnTiptap } from "@/components/shadcn-tiptap"

import { AdvancedForm } from "./advanced-form"
import { BasicForm } from "./basic-form"
import { SettingForm } from "./setting-form"

const defaultValues: IPost = {
  id: 0,
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
  })

  useEffect(() => {
    if (!post) return
    Object.keys(post).forEach((key) => {
      const value = post[key as keyof IPost]
      const formKey = key as keyof IPost
      const isDate = [
        "customCreatedAt",
        "customUpdatedAt",
        "createdAt",
        "updatedAt",
      ].includes(key)
      if (isDate) {
        console.log(`${key}: ${value}`)
        if (value !== undefined && value !== null) {
          form.setValue(formKey, new Date(value.toString()))
        }
      } else {
        if (value === undefined || value === null) {
          form.setValue(formKey, "")
        } else {
          form.setValue(formKey, value)
        }
      }
    })
  }, [post])

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

  const onSubmit = async (data: IPost) => {
    const content = form.getValues("content")
    if (isEmpty(content)) {
      toast.error("写点什么吧")
      return
    }
    try {
      console.log({ ...data, content })
      const url = slug === "create" ? "/api/posts" : `/api/posts/${slug}`
      const res = await fetch(url, {
        method: slug === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, content }),
        credentials: "include",
      })
      console.log("res: ", res)
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
        <div className="h-full overflow-auto shadow-sm flex-grow scroll-smooth max-w-2xl">
          <ShadcnTiptap
            content={post?.content}
            editable={true}
            onContentChange={(content) => {
              form.setValue("content", content)
            }}
          />
        </div>
        <div className="flex-1 overflow-auto shadow-sm flex-grow scroll-smooth max-w-2xl">
          Preview
        </div>
      </div>
    </main>
  )
}
