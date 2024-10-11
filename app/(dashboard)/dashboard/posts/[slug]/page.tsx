"use client"

import { useEffect, useState } from "react"
import { TiptapEditor } from "@/components/tiptap"
import { useTiptapEditor } from "@/components/tiptap/use-tiptap-editor"
import { fetchPostDetail } from "@/lib/api/post"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { DatePicker } from "@/components/ui/date-picker"
import { TagInput } from "@/components/ui/tag-input"
import { Post } from "@/types/post"
import { Category } from "@/types/category"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Settings, FileText } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePosts } from "@/hooks/query/use-posts"
import { MultiSelect } from "@/components/multi-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useCategories } from "@/hooks/query/use-categories"

const postFormSchema = z.object({
  title: z.string().min(1, { message: "标题不能为空" }),
  slug: z.string().min(1, { message: "Slug 不能为空" }),
  content: z.string(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()),
  isCopyright: z.boolean(),
  isTop: z.boolean(),
  topOrder: z.number().optional(),
  summary: z.string(),
  customCreatedAt: z.date(),
  customUpdatedAt: z.date(),
  relatedPosts: z.array(z.string()),
  category: z.string(),
  status: z.enum(["draft", "published"]),
})

type PostFormValues = z.infer<typeof postFormSchema>

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [post, setPost] = useState<Post | null>(null)
  const { data: posts, isLoading: isLoadingPosts } = usePosts()
  const { data: categories, isLoading: isLoadingCategories } = useCategories()
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      coverImage: "",
      tags: [],
      isCopyright: false,
      isTop: false,
      topOrder: 0,
      summary: "",
      customCreatedAt: new Date(),
      customUpdatedAt: new Date(),
      relatedPosts: [],
      category: "",
      status: "draft",
    },
  })

  const { editor } = useTiptapEditor({
    initialContent: post?.content || null,
    onJSONContentChange: (content) => {
      form.setValue("content", JSON.stringify(content))
    },
  })

  useEffect(() => {
    const loadPost = async () => {
      if (slug !== "create") {
        const fetchedPost = await fetchPostDetail(slug)
        setPost(fetchedPost)
        form.reset({
          ...fetchedPost,
        })
      }
    }
    loadPost()
  }, [slug, form])

  useEffect(() => {
    if (post?.content && editor) {
      editor.commands.setContent(post.content)
    }
  }, [post, editor])

  const onSubmit = (data: PostFormValues) => {
    console.log("Saving post:", data)
    // 实现你的保存逻辑
  }

  const pageTitle = slug === "create" ? "创建文章" : "编辑文章"

  if (!post && slug !== "create") {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <main className="flex flex-col h-screen p-4">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
            <div className="flex space-x-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>文章摘要和标签</SheetTitle>
                    <SheetDescription>编辑文章的摘要和标签。</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>摘要</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标签</FormLabel>
                          <FormControl>
                            <TagInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>文章设置</SheetTitle>
                    <SheetDescription>
                      在这里调整文章的详细设置。
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>分类</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择分类" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingCategories ? (
                                <div>Loading categories...</div>
                              ) : (
                                categories?.map((c: Category) => (
                                  <SelectItem
                                    key={c.id}
                                    value={c.id.toString()}
                                  >
                                    {c.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isTop"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>置顶</FormLabel>
                            <FormDescription>将此文章置顶显示</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    {form.watch("isTop") && (
                      <FormField
                        control={form.control}
                        name="topOrder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>置顶顺序</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="customCreatedAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>自定义创建日期</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customUpdatedAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>自定义更新日期</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>状态</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择状态" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">草稿</SelectItem>
                              <SelectItem value="published">已发布</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relatedPosts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>相关文章</FormLabel>
                          <FormControl>
                            {isLoadingPosts ? (
                              <div>Loading posts...</div>
                            ) : (
                              <MultiSelect
                                options={
                                  posts?.map((p: Post) => ({
                                    value: p.slug,
                                    label: p.title,
                                  })) || []
                                }
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="选择相关文章"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isCopyright"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>版权保护</FormLabel>
                            <FormDescription>
                              启用此选项以保护文章版权
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Button type="submit">保存</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto rounded-lg border shadow-sm">
              <TiptapEditor editor={editor} />
            </div>
          </div>
        </main>
      </form>
    </Form>
  )
}
