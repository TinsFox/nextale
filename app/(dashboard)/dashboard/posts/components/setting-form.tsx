"use client"

import { Settings } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Category } from "@/types/category"
import { Post } from "@/types/post"
import { IPost } from "@/lib/schema/post.schema"
import { useCategories } from "@/hooks/query/use-categories"
import { usePosts } from "@/hooks/query/use-posts"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { MultiSelect } from "@/components/multi-select"

export function SettingForm({
  form,
  slug,
}: {
  form: UseFormReturn<IPost>
  slug: string
}) {
  const { data: posts, isLoading: isLoadingPosts } = usePosts()
  console.log("posts: ", posts)
  const { data: categories, isLoading: isLoadingCategories } = useCategories()
  return (
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
                        <SelectItem key={c.id} value={c.id.toString()}>
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
                          value: String(p.id),
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
            name="customCreatedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自定义发布时间</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
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
                <FormLabel>自定义更新时间</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isCopyright"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>版权保护</FormLabel>
                  <FormDescription>启用此选项以保护文章版权</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTop"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
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
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {slug !== "create" && (
            <>
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>发布时间</FormLabel>
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
                name="updatedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>更新时间</FormLabel>
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
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
