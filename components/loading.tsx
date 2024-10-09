"use client"

import { motion } from "framer-motion"

export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background">
      <motion.div
        className="w-12 h-12 border-2 border-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      />
      <motion.p
        className="mt-4 text-sm font-medium text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        加载中...
      </motion.p>
    </div>
  )
}
export default Loading
