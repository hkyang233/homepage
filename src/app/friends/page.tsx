'use client'

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Friend {
  name: string
  url: string
  description: string
  avatar?: string
  color: string
}

const friends: Friend[] = [
  {
    name: "9527's Blog",
    url: "https://9527dhx.top/",
    description: "永远相信美好的事情即将发生",
    avatar: "https://q.qlogo.cn/g?b=qq&nk=2548635484&s=100",
    color: "#346c9c"
  },
  {
    name: "布丁の小窝",
    url: "https://www.furryowo.top/",
    description: "一个有梦想的咸鱼",
    avatar: "https://dn-qiniu-avatar.qbox.me/avatar/7da7e82f04de94c795db0301c3397bb6?",
    color: "#fcc307"
  },
  {
    name: "小丁的屋舍",
    url: "https://xding.top/",
    description: "https://xding.top/face.png",
    avatar: "https://xding.top/face.png",
    color: "#009688"
  },
  {
    name: "fly6022",
    url: "https://fly6022.fun/",
    description: "Salvation lies within.",
    avatar: "https://imageurl.fly6022.fun/images/logo.png",
    color: "#8bbdec"
  },
  {
    name: "GoodBoyboy's Blog",
    url: "https://blog.goodboyboy.top/",
    description: "惬意小屋 - 点滴记忆",
    avatar: "https://gravatar.goodboyboy.top/avatar/9da9d1d515d273d4794015f2321f6e04?s=96&d=monsterid&r=g",
    color: "#66c18c"
  },
  {
    name: "添加友链",
    url: "/friends/add",
    description: "点我添加友链",
    avatar: "https://q.qlogo.cn/g?b=qq&nk=2958445350&s=100",
    color: "#000000"
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}

export default function FriendsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl mx-auto py-12 md:py-20">
          <motion.div 
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold">Friends</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              这里有一些志同道合的朋友们
            </p>
          </motion.div>
          <motion.div 
            className="mx-auto flex flex-col gap-6 md:max-w-2xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {friends.map((friend, index) => (
              <motion.a
                key={friend.url}
                href={friend.url}
                target="_blank"
                rel="noreferrer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="block focus:outline-none"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="flex items-center p-4 md:p-6 rounded-xl border transition-all"
                  style={{
                    background: `${friend.color}20`,
                    borderColor: friend.color,
                  }}
                >
                  <motion.img
                    src={friend.avatar}
                    alt={friend.name}
                    className="h-16 w-16 rounded-full border-2"
                    style={{ borderColor: friend.color }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <div className="ml-4 flex-1">
                    <motion.div 
                      className="font-bold text-lg"
                      style={{ color: friend.color }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {friend.name}
                    </motion.div>
                    <motion.div 
                      className="text-muted-foreground text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {friend.description}
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>
      </main>
      <motion.footer 
        className="border-t py-6 md:py-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/hkyang233"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Yang
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/hkyang233/homepage"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </motion.footer>
    </div>
  )
} 