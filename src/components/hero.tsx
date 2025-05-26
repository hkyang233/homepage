'use client'

import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="mb-8"
      >
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/avatar.jpg"
            alt="头像"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          你好，我是 <span className="text-primary">Yang</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 h-10"
      >
        <Typewriter
          words={[
            '我在这个网站记录我的成长，努力\\owo/ ~',
            '料青山略输我峥嵘.',
            '欢迎来到我的个人主页！'
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.div>
    </section>
  );
} 