"use client"

import { useEffect, useState } from "react"
import { TiptapEditor } from "@/components/tiptap"
import { useTiptapEditor } from "@/components/tiptap/use-tiptap-editor"
import { fetchPostDetail } from "@/lib/api/post"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { TagInput } from "@/components/ui/tag-input"
import { Post } from "@/types/post"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Settings, FileText } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [post, setPost] = useState<Post | null>(null)

  const { editor, handleSave } = useTiptapEditor({
    initialContent: post?.content || null,
    onJSONContentChange: (content) => {
      setPost((prev) =>
        prev ? { ...prev, content: JSON.stringify(content) } : null
      )
    },
  })

  const savePost = async () => {
    const content = handleSave()
    console.log("Saving post:", { ...post, content })
    // 实现你的保存逻辑
  }

  useEffect(() => {
    const loadPost = async () => {
      if (slug !== "create") {
        const fetchedPost = await fetchPostDetail(slug)
        setPost(fetchedPost)
      } else {
        setPost({
          title: "",
          content: "",
          coverImage: "",
          tags: [],
          isCopyright: false,
          isTop: false,
          topOrder: 0,
          summary: "",
          customCreatedAt: new Date().toISOString().split("T")[0],
          customUpdatedAt: new Date().toISOString().split("T")[0],
          relatedPosts: [],
          category: "",
          slug: "",
          status: "draft",
        })
      }
    }
    loadPost()
  }, [slug])

  useEffect(() => {
    if (post?.content && editor) {
      editor.commands.setContent(post.content)
    }
  }, [post, editor])

  const pageTitle = slug === "create" ? "创建文章" : "编辑文章"

  if (!post) {
    return <div>Loading...</div>
  }

  return (
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
                <div>
                  <Label htmlFor="summary">摘要</Label>
                  <Textarea
                    id="summary"
                    value={post.summary}
                    onChange={(e) => setPost({ ...post, summary: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>标签</Label>
                  <TagInput
                    value={post.tags}
                    onChange={(tags) => setPost({ ...post, tags })}
                  />
                </div>
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
                <SheetDescription>在这里调整文章的详细设置。</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">分类</Label>
                  <Input
                    id="category"
                    value={post.category}
                    onChange={(e) =>
                      setPost({ ...post, category: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isCopyright"
                    checked={post.isCopyright}
                    onCheckedChange={(checked) =>
                      setPost({ ...post, isCopyright: checked as boolean })
                    }
                  />
                  <Label htmlFor="isCopyright">版权保护</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isTop"
                    checked={post.isTop}
                    onCheckedChange={(checked) =>
                      setPost({ ...post, isTop: checked })
                    }
                  />
                  <Label htmlFor="isTop">置顶</Label>
                </div>
                {post.isTop && (
                  <div>
                    <Label htmlFor="topOrder">置顶顺序</Label>
                    <Input
                      id="topOrder"
                      type="number"
                      value={post.topOrder}
                      onChange={(e) =>
                        setPost({ ...post, topOrder: parseInt(e.target.value) })
                      }
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="customCreatedAt">创建日期</Label>
                  <DatePicker
                    value={new Date(post.customCreatedAt)}
                    onChange={(date: Date) =>
                      setPost({
                        ...post,
                        customCreatedAt: date.toISOString().split("T")[0],
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="customUpdatedAt">更新日期</Label>
                  <DatePicker
                    value={new Date(post.customUpdatedAt)}
                    onChange={(date: Date) =>
                      setPost({
                        ...post,
                        customUpdatedAt: date.toISOString().split("T")[0],
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="status">状态</Label>
                  <Select
                    value={post.status}
                    onValueChange={(value) =>
                      setPost({
                        ...post,
                        status: value as "draft" | "published",
                      })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="published">已发布</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>相关文章</Label>
                  <TagInput
                    value={post.relatedPosts}
                    onChange={(relatedPosts) =>
                      setPost({ ...post, relatedPosts })
                    }
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button onClick={savePost}>保存</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto rounded-lg border shadow-sm">
          <TiptapEditor editor={editor} />
        </div>
      </div>
    </main>
  )
}