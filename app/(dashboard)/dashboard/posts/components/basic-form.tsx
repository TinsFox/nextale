"use client"

import { env } from "@/env"
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
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-end w-full justify-start group">
                <p className="text-sm text-muted-foreground">
                  {`${env.NEXT_PUBLIC_URL}/posts/`}
                </p>
                <div className="flex items-center gap-2 relative ">
                  <Input
                    {...field}
                    className="flex-1 w-full focus-visible:ring-0 shadow-none border-b border border-t-0 border-l-0 border-r-0 rounded-none focus-visible:border-primary hover:z-[1] peer"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 opacity-0 transition-opacity peer-hover:opacity-100 peer-focus:opacity-100"
                    type="button"
                    onClick={() => {
                      const title = form.getValues("title")
                      seoSlugGenerator(title).then((slug) => {
                        form.setValue("slug", slug)
                      })
                    }}
                  >
                    <WandSparkles className="size-4" />
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
