import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { ExternalLink, MoreHorizontal, Pencil } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type IPostDetail, POST_STATUS } from "@/lib/schema/post.schema";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<IPostDetail>[] = [
	{
		accessorKey: "title",
		header: () => <div className="w-[80px]">标题</div>,
		cell: ({ row }) => {
			const post = row.original;
			return (
				<div className="flex gap-4 py-4">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 ">
							<h3 className="font-medium text-base truncate">{post.title}</h3>

							<div className="invisible group-hover:visible flex gap-2">
								<Link href={`/dashboard/posts/${post.id}`} target="_blank">
									<Pencil className="size-4 text-muted-foreground hover:text-primary" />
								</Link>
								<Link href={`/posts/${post.slug}`} target="_blank">
									<ExternalLink className="size-4 text-muted-foreground hover:text-primary" />
								</Link>
							</div>
						</div>

						{/* 摘要和内容预览 */}
						{post.summary && (
							<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
								{post.summary}
							</p>
						)}

						{/* 底部信息栏 */}
						<div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
							<div className="flex gap-1 flex-col">
								<div>
									创建于
									{formatDate(
										post.customCreatedAt || post.createdAt,
										"yyyy-MM-dd HH:mm",
									)}
								</div>
								<div>
									更新于
									{formatDate(
										post.customUpdatedAt || post.updatedAt,
										"yyyy-MM-dd HH:mm",
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "状态",
		cell: ({ row }) => {
			const post = row.original;
			const handleStatusChange = async (newStatus: string) => {
				try {
					const response = await fetch(`/api/posts/${post.id}/status`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ status: newStatus }),
					});

					if (!response.ok) {
						throw new Error("Failed to update status");
					}

					toast.success("状态更新成功");
				} catch (error) {
					toast.error("状态更新失败");
					console.error(error);
				}
			};

			return (
				<div className="flex items-center gap-2 justify-center">
					<Select value={post.status} onValueChange={handleStatusChange}>
						<SelectTrigger className="w-[100px] text-center">
							<SelectValue>
								{post.status === POST_STATUS.DRAFT && "草稿"}
								{post.status === POST_STATUS.PUBLISHED && "已发布"}
								{post.status === POST_STATUS.ARCHIVED && "已归档"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={POST_STATUS.DRAFT}>草稿</SelectItem>
							<SelectItem value={POST_STATUS.PUBLISHED}>已发布</SelectItem>
							<SelectItem value={POST_STATUS.ARCHIVED}>已归档</SelectItem>
						</SelectContent>
					</Select>
				</div>
			);
		},
	},
	{
		accessorKey: "isTop",
		header: "置顶",
		cell: ({ row }) => {
			const post = row.original;
			return (
				<div className="flex items-center gap-2 justify-center">
					<Switch checked={post.isTop} />
					{post.isTop && (
						<span className="text-xs text-muted-foreground">
							{post.topOrder}
						</span>
					)}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "操作",
		cell: ({ row }) => {
			const post = row.original;
			return (
				<div className="flex items-center gap-2 justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link to={`./posts/${post.id}`}>编辑</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>删除</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
