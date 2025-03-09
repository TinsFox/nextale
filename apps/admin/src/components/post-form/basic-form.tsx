import { env } from "@/env";
import { WandSparkles } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { IPost } from "@/lib/schema/post.schema";

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
						<FormControl>
							<div className="flex items-end w-full gap-2">
								<p className="text-sm text-muted-foreground whitespace-nowrap leading-7">
									{`${env.NEXT_PUBLIC_URL}/posts/`}
								</p>
								<div className="relative flex-1 group">
									<Input
										{...field}
										className="shadow-none w-full pr-10 border-0 border-b rounded-none focus-visible:ring-0 focus:border-primary hover:border-primary/50 transition-colors h-7 px-0 pb-0"
									/>
									<Button
										variant="ghost"
										size="icon"
										className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent"
										type="button"
										onClick={() => {
											const title = form.getValues("title");
											// TODO
											// seoSlugGenerator(title).then((slug) => {
											// 	form.setValue("slug", slug);
											// });
										}}
									>
										<WandSparkles className="size-4 text-muted-foreground hover:text-primary transition-colors" />
									</Button>
								</div>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
