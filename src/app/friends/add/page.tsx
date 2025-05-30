'use client'

import { Navbar } from '@/components/navbar'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

export default function FriendsAddPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl mx-auto py-12 md:py-20">
          <motion.div 
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-10"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold">添加友链</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              博客已重新建立，大多友链都找不回来了 qwq，欢迎重新添加
            </p>
          </motion.div>

          {/* 申请方法 */}
          <motion.div 
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">申请方法 / How to Apply</h2>
              <motion.p 
                className="mb-2 text-base text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                添加本站后，在本页面留言，格式如下：
              </motion.p>
              <motion.ul 
                className="list-disc pl-6 text-muted-foreground text-base space-y-1"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.li variants={fadeInUp}>博客名：</motion.li>
                <motion.li variants={fadeInUp}>网址：</motion.li>
                <motion.li variants={fadeInUp}>简短描述：</motion.li>
                <motion.li variants={fadeInUp}>一张图片：</motion.li>
              </motion.ul>
              <motion.h3 
                className="text-lg font-semibold mb-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                申请注意
              </motion.h3>
              <motion.ul 
                className="list-disc pl-6 text-muted-foreground text-base space-y-1"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.li variants={fadeInUp}>需要全站开启 <span className="font-mono">HTTPS</span> 协议</motion.li>
                <motion.li variants={fadeInUp}>只接受个人 Blog 交换</motion.li>
              </motion.ul>
            </div>
          </motion.div>

          {/* 本站信息 */}
          <motion.div 
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">本站信息 / My Info</h2>
              <motion.ul 
                className="list-disc pl-6 text-muted-foreground text-base space-y-1"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.li variants={fadeInUp}>名称: Yang's Blog</motion.li>
                <motion.li variants={fadeInUp}>网址: https://kaeshi.top</motion.li>
                <motion.li variants={fadeInUp}>描述: Make a dent in the universe.</motion.li>
                <motion.li variants={fadeInUp}>图片: http://q.qlogo.cn/headimg_dl?dst_uin=2958445350&spec=640&img_type=jpg</motion.li>
              </motion.ul>
              <motion.div 
                className="mt-4 text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                添加请发邮件到 <a href="mailto:beitqwq@icloud.com" className="text-primary hover:underline">beitqwq@icloud.com</a>
              </motion.div>
            </div>
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