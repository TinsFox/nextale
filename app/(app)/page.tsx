import { env } from "@/env"
import * as motion from "framer-motion/client"

interface Social {
  id: string | number
  url: string
  icon: string
}

async function fetchUserProfile() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/user-profile`)
  const data = await res.json()
  return data
}

export default async function Home() {
  const userProfile = await fetchUserProfile()
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      <motion.main
        className="flex-grow flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Hi, I&apos;m {userProfile.data.username} 👋
          </motion.h1>

          <motion.div
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            dangerouslySetInnerHTML={{ __html: userProfile.data.bio || "" }}
          />

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {userProfile.data.socials?.length > 0 &&
              userProfile.data.socials?.map((social: Social) => (
                <SocialIcon
                  key={social.id}
                  href={social.url}
                  icon={social.icon}
                />
              ))}
          </motion.div>
        </div>
      </motion.main>

      <motion.footer
        className="text-center p-4 text-gray-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p>成长是学会接纳，一个人两性的同时也是先天的过程。——《时间的答案》</p>
        <motion.span
          className="mt-2 inline-block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.span>
      </motion.footer>
    </div>
  )
}

function SocialIcon({ href, icon }: { href: string; icon: string }) {
  return (
    <motion.a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl hover:bg-gray-300 transition-colors"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      {icon}
    </motion.a>
  )
}
