"use client"

import Link from "next/link"
import * as motion from "framer-motion/client"

import { cn } from "@/lib/utils"
import { useSiteConfig } from "@/hooks/query/use-site-config"

import { UserArrowLeftIcon } from "../icons/user-arrow-left"

export function Header() {
  const { navItems, theme, isLoading } = useSiteConfig()

  return (
    <header className="sticky z-10 inset-x-0 top-0 p-4 flex justify-between items-center h-[4.5rem] overflow-hidden transition-shadow duration-200 bg-background shadow-sm">
      <div className="flex justify-around items-center w-full max-w-7xl mx-auto lg:px-8 ">
        <div className="flex items-center">
          <img
            className="rounded-full w-10 h-10"
            src={theme?.user.avatar}
            alt={theme?.user.username}
          />
        </div>
        {!isLoading && (
          <div className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
            <nav className="flex justify-center items-center min-w-0 grow">
              <ul className="flex space-x-6 justify-center whitespace-nowrap px-4 py-2">
                {navItems?.map((item, index) => (
                  <motion.li
                    className=""
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="">
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        )}
        <div className="flex items-center">
          <Link
            href="/dashboard"
            className={cn(
              "group rounded-full bg-base-100 size-10",
              "px-3 text-sm ring-1 ring-zinc-900/5 transition dark:ring-white/10 dark:hover:ring-white/20",
              "justify-center items-center flex"
            )}
          >
            <UserArrowLeftIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}
