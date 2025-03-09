import { PostEditor } from "@/components/post-form/post-editor";
import { fetchPostDetail } from "@/lib/api/post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/posts/$postId")({
	component: RouteComponent,
	loader: ({ params }) => {
		return fetchPostDetail(params.postId);
	},
	notFoundComponent: () => {
		return <p>Post not found</p>;
	},
});

function RouteComponent() {
	const posts = Route.useLoaderData();

	return (
		<div>
			<PostEditor slug="123" post={posts} />
		</div>
	);
}
