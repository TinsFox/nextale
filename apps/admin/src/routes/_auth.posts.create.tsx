import { PostEditor } from "@/components/post-form/post-editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/posts/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<PostEditor slug="create" />
		</div>
	);
}
