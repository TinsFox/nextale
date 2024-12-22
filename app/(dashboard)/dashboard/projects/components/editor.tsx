"use client"

import { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons"

import { createProject, updateProject } from "@/lib/api/admin/projects"
import { IProject, projectSchema } from "@/lib/schema/projects"
import { cn } from "@/lib/utils"
import { useProject } from "@/hooks/query/use-projects"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UploadInput } from "@/components/upload-input"
import { useHotkeys } from "react-hotkeys-hook"

export function Editor({ id }: { id: string }) {
  const router = useRouter()
  const isNew = id === "new"

  const { data } = useProject(isNew ? 0 : Number(id))

  const form = useForm<IProject>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      summary: "",
      docsUrl: "",
      previewUrl: "",
      videoUrl: "",
      previewImage: [],
      readme: "",
      techStack: [],
      status: "draft",
      order: 0,
      coverImage: "",
      isDeleted: false,
      github: "",
    },
  })
  const [isPendingSaving, startTransitionSaving] = useTransition()

  const handleSave = async () => {
    if (isPendingSaving) return
    form.handleSubmit(onSubmit)()
  }

  useHotkeys("meta+s, ctrl+enter", handleSave, {
    preventDefault: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
  })

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name)
      form.setValue("status", data.status)
      form.setValue("order", data.order)
      form.setValue("github", data.github || "")
      form.setValue("summary", data.summary || "")
      form.setValue("techStack", data.techStack)
      form.setValue("readme", data.readme)
      form.setValue("previewImage", data.previewImage)
      form.setValue("videoUrl", data.videoUrl)
      form.setValue("docsUrl", data.docsUrl)
      form.setValue("previewUrl", data.previewUrl)
      form.setValue("coverImage", data.coverImage || "")
      form.setValue("isDeleted", data.isDeleted)
      form.setValue("id", data.id)
      form.setValue("createdAt", new Date(data.createdAt))
      form.setValue("updatedAt", new Date(data.updatedAt))
    }
  }, [data])

  const onSubmit = async (data: IProject) => {
    startTransitionSaving(async () => {
      try {
        if (!isNew) {
          await updateProject(Number(id), data)
        } else {
          await createProject(data)
        }
        toast.success(`项目${isNew ? "创建" : "更新"}成功`)

      } catch (error) {
        console.log("error: ", error)
        toast(`项目${isNew ? "创建" : "更新"}失败`)
      }
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {id === "new" ? "新增项目" : "编辑项目"}
        </h1>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/projects")}
          >
            取消
          </Button>
          <Button
            type="submit"
            form="project-form"
            disabled={isPendingSaving}
            onClick={handleSave}
          >
            {isPendingSaving && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            保存
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          autoComplete="off"
          id="project-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* add hidden input for id */}
            <input type="hidden" name="id" value={id} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目名称</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    value={field.value}
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
                      <SelectItem value="archived">已归档</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>排序</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="docsUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>文档链接</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previewUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>预览链接</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>视频链接</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 flex-col w-full">
                      <Input {...field} placeholder="输入视频链接" />
                      <UploadInput
                        value={field.value}
                        onChange={field.onChange}
                        accept="video/*"
                        placeholder="输入视频链接或上传视频"
                        preview
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>封面图片</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 flex-col w-full">
                      <Input {...field} placeholder="输入图片链接" />
                      <UploadInput
                        value={field.value}
                        onChange={field.onChange}
                        accept="image/*"
                        placeholder="输入图片链接或上传图片"
                        preview
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>项目简介</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="readme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>README</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>技术栈</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value?.join(", ")}
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(
                        value.split(",").map((item) => item.trim())
                      )
                    }}
                    placeholder="使用逗号分隔多个技术栈"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="grid grid-cols-2 gap-4">
            {/* createdAt */}
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>创建时间</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* updatedAt */}
            <FormField
              control={form.control}
              name="updatedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>更新时间</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
