"use client"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IProject, projectSchema } from "@/lib/schema/projects"
import { createProject, updateProject } from "@/lib/api/admin/projects"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UploadInput } from "@/components/upload-input"

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: IProject | null
  onClose: () => void
}

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onClose,
}: ProjectDialogProps) {
  const form = useForm<IProject>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
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
    },
  })

  useEffect(() => {
    if (project) {
      form.reset(project)
    }
  }, [project, form])

  const onSubmit = async (data: IProject) => {
    try {
      if (project) {
        await updateProject(project.id, data)
      } else {
        await createProject(data)
      }
      toast(`项目${project ? "更新" : "创建"}成功`)
      onOpenChange(false)
      onClose()
    } catch (error) {
      toast(`项目${project ? "更新" : "创建"}失败`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{project ? "编辑" : "新增"}项目</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目简介</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <UploadInput
                        value={field.value}
                        onChange={field.onChange}
                        accept="video/*"
                        uploadText="上传视频"
                        placeholder="输入视频链接或上传视频"
                      />
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
                      <UploadInput
                        value={field.value}
                        onChange={field.onChange}
                        accept="image/*"
                        uploadText="上传图片"
                        placeholder="输入图片链接或上传图片"
                        preview
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                        field.onChange(value.split(",").map(item => item.trim()))
                      }}
                      placeholder="使用逗号分隔多个技术栈"
                    />
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

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  onClose()
                }}
              >
                取消
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}