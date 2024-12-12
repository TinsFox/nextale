import Link from "next/link"
import * as motion from "framer-motion/client"

import { getSiteConfig } from "@/lib/api/config"

export async function Header() {
  const { navItems } = await getSiteConfig()

  return (
    <motion.header
      className="p-4 flex justify-between items-center sticky top-0 z-50 bg-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex justify-between items-center flex-grow">
        <ul className="flex space-x-6 justify-center flex-grow">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href} className="hover:text-blue-500">
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
