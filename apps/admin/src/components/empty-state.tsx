import { motion } from "motion/react";
import type React from "react";

export type EmptyStateProps = {
	title?: string;
	description?: string;
	icon?: React.ComponentType<{ className: string }>;
	action?: React.ReactNode;
};
export const EmptyState = ({
	title = "No items found",
	description = "Get started by creating your first item",
	icon: Icon,
	action,
}: EmptyStateProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="flex flex-col items-center justify-center p-8 text-center"
		>
			{Icon && (
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.1, duration: 0.4 }}
					className="mb-6 text-gray-400"
				>
					<Icon className="w-12 h-12" />
				</motion.div>
			)}

			<motion.h3
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
			>
				{title}
			</motion.h3>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm"
			>
				{description}
			</motion.p>

			{action && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					{action}
				</motion.div>
			)}
		</motion.div>
	);
};
