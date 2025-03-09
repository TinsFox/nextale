import { EmptyState } from "@/components/empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchPosts } from "@/lib/api/admin/post";
import { cn } from "@/lib/utils";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/posts/")({
	component: RouteComponent,
	loader: async () => {
		return fetchPosts();
	},
});

function RouteComponent() {
	const posts = Route.useLoaderData();
	if (!posts.data.records.length) {
		return (
			<div className="flex-1 h-svh flex justify-center items-center">
				<EmptyState
					description="There are no posts yet."
					action={
						<Link
							to={"/posts/create"}
							className={cn(buttonVariants({ variant: "default" }))}
						>
							write a post
						</Link>
					}
				/>
			</div>
		);
	}
	return (
		<main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 space-y-2">
			<div className="rounded-lg ">
				{posts.data.records?.map((post) => (
					<div
						key={post.id}
						className="flex items-center justify-between border-b p-4 last:border-b-0 hover:bg-slate-50"
					>
						<div className="flex items-center gap-3">
							<div className="flex flex-col">
								<Link
									params={{ postId: post.id }}
									to={"/posts/$postId"}
									className="font-medium hover:text-blue-600"
								>
									{post.title}
								</Link>
								<span className="text-sm text-slate-500">{post.summary}</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<span
								className={`px-2 py-1 text-xs rounded-full ${
									post.status === "draft"
										? "bg-yellow-100 text-yellow-800"
										: post.status === "published"
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
		</main>
	);
}
