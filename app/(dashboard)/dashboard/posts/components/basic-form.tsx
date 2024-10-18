"use client"

import { WandSparkles } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { seoSlugGenerator } from "@/lib/actions/seo-slug-generator"
import { IPost } from "@/lib/schema/post.schema"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function BasicForm({ form }: { form: UseFormReturn<IPost> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem hidden>
            <FormLabel>文章 ID</FormLabel>
            <FormControl>
              <Input {...field}></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
              <div className="flex items-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  type="button"
                  onClick={() => {
                    const title = form.getValues("title")
                    seoSlugGenerator(title).then((slug) => {
                      form.setValue("slug", slug)
                    })
                  }}
                >
                  <WandSparkles className="h-4 w-4" />
                </Button>
                <Input {...field} className="pl-10" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
