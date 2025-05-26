'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Navbar } from "@/components/navbar"
import { motion, useInView } from 'framer-motion'

interface Post {
  cid: number
  title: string
  text: string
  created: number
  author: { screenName: string }
  tag?: { name: string }[]
}

const PAGE_SIZE = 10

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  useEffect(() => {
    setLoading(true)
    fetch(`http://127.0.0.1:2020/api/posts?page=${page}&pageSize=${PAGE_SIZE}`)
      .then(res => res.json())
      .then(data => {
        const newPosts = (data.data || []).map((item: any) => ({
          ...item,
          created: Number(item.created),
          author: { screenName: item.author?.[0]?.screenName || '' },
        }))
        setPosts(prev => page === 1 ? newPosts : [...prev, ...newPosts])
        setHasMore(newPosts.length === PAGE_SIZE)
        setLoading(false)
      })
  }, [page])

  // 计算阅读时长
  const getReadTime = (text: string) => {
    const words = text.replace(/<[^>]+>/g, '').length
    return Math.max(1, Math.round(words / 300))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl mx-auto py-12 md:py-20">
        <div className="mx-auto flex flex-col items-center space-y-4 text-center mb-10">
            <h1 className="font-heading text-4xl md:text-6xl font-bold">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              我的一些碎碎念...
            </p>
          </div>
          <div ref={containerRef} className="flex flex-col gap-6">
            {posts.map((post, idx) => (
              <motion.div
                key={post.cid}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -4, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
                className="group bg-card rounded-lg border shadow-sm px-6 py-5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tag && post.tag.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">{t.name}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.cid}`}>
                  <h2 className="text-xl font-bold mb-1 group-hover:text-primary group-hover:underline transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
                  <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>by {post.author.screenName}</span>
                  <span>·</span>
                  <span>{getReadTime(post.text)} 分钟阅读</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.text.replace(/<[^>]+>/g, '').slice(0, 80)}...
                </p>
              </motion.div>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loading}
                className="px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 transition text-base"
              >
                {loading ? '加载中...' : '加载更多'}
              </button>
            </div>
          )}
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
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
      </footer>
    </div>
  )
} 