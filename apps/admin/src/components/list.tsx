import { File, ListFilter, PlusCircle } from "lucide-react";
import { parseAsJson, useQueryState } from "nuqs";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePosts } from "@/hooks/query/use-posts";

import { Link } from "@tanstack/react-router";

const schema = z.object({
	status: z.string(),
});
export function PostList() {
	const { data: posts } = usePosts();
	const [query, setQuery] = useQueryState("query", parseAsJson(schema.parse));

	return (
		<>
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="draft">Draft</TabsTrigger>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="archived" className="hidden sm:flex">
							Archived
						</TabsTrigger>
					</TabsList>
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-7 gap-1">
									<ListFilter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Filter
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button size="sm" variant="outline" className="h-7 gap-1">
							<File className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Export
							</span>
						</Button>
						<Link to={"/posts/create"}>
							<Button size="sm" className="h-7 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									新文章
								</span>
							</Button>
						</Link>
					</div>
				</div>
			</Tabs>
			<div className="rounded-lg border">
				{posts?.map((post) => (
					<div
						key={post.id}
						className="flex items-center justify-between border-b p-4 last:border-b-0 hover:bg-slate-50"
					>
						<div className="flex items-center gap-3">
							<div className="flex flex-col">
								<Link
									to={`/posts/${post.id}`}
									className="font-medium hover:text-blue-600"
								>
									{post.title}
								</Link>
								<span className="text-sm text-slate-500">
									{post.description}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<span
								className={`px-2 py-1 text-xs rounded-full ${
									post.status === "draft"
										? "bg-yellow-100 text-yellow-800"
										: post.status === "active"
											? "bg-green-100 text-green-800"
											: "bg-gray-100 text-gray-800"
								}`}
							>
								{post.status}
							</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
