'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ClickFeedback from '@/components/click-feedback'
import dynamic from "next/dynamic"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"

interface Post {
  cid: number
  title: string
  text: string
  created: number
  author: { screenName: string }
  tag?: { name: string }[]
}

interface Comment {
  coid: number
  author: string
  text: string
  created: number
}

const MarkdownRender = dynamic(() => import('@/components/MarkdownRender'), { ssr: false })

export default function BlogDetailPage() {
  const { cid } = useParams() as { cid: string }
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentForm, setCommentForm] = useState({ author: '', mail: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`https://blog.kaeshi.top/api/post?cid=${cid}`).then(res => res.json()),
      fetch(`https://blog.kaeshi.top/api/commentsByCid?cid=${cid}`).then(res => res.json())
    ]).then(([postData, commentsData]) => {
      const postRaw = postData.data
      const post = postRaw
        ? {
            ...postRaw,
            created: Number(postRaw.created),
            author: { screenName: postRaw.author?.[0]?.screenName || '' }
          }
        : null
      const commentList = Array.isArray(commentsData.data) ? commentsData.data : []
      setPost(post)
      setComments(commentList.map((c: any) => ({
        ...c,
        created: Number(c.created)
      })))
      setLoading(false)
    })
  }, [cid])

  const getReadTime = (text: string) => {
    const words = text.replace(/<[^>]+>/g, '').length
    return Math.max(1, Math.round(words / 300))
  }

  if (loading) return <div className="text-center py-10">加载中...</div>
  if (!post) return <div className="text-center py-10">文章不存在或数据结构不符</div>

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-8 md:py-12">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tag && post.tag.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">{t.name}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight break-words">{post.title}</h1>
            <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
              <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
              <span>·</span>
              <span>by Yang</span>
              <span>·</span>
              <span>{post.directory}</span>
              <span>·</span>
              <span>{getReadTime(post.text)} 分钟阅读</span>
            </div>
          </div>
          <div className="mb-10">
            <MarkdownRender content={post.text} />
          </div>
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">评论</h2>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 mb-8 shadow-sm">
              <div className="flex flex-col justify-between rounded-md p-6">
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setSubmitting(true)
                    await fetch('https://blog.kaeshi.top/api-comment.php', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: new URLSearchParams({
                        cid,
                        author: commentForm.author,
                        mail: commentForm.mail,
                        text: commentForm.text
                      })
                    })
                    setCommentForm({ author: '', mail: '', text: '' })
                    // 重新加载评论
                    fetch(`https://blog.kaeshi.top/api/commentsByCid?cid=${cid}`)
                      .then(res => res.json())
                      .then(data => setComments((Array.isArray(data.data) ? data.data : []).map((c: any) => ({ ...c, created: Number(c.created) }))))
                    setSubmitting(false)
                  }}
                  className="space-y-4"
                >
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <input
                      className="flex-1 px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition placeholder:text-muted-foreground text-base"
                      required placeholder="昵称"
                      value={commentForm.author}
                      onChange={e => setCommentForm(f => ({ ...f, author: e.target.value }))}
                    />
                    <input
                      className="flex-1 px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition placeholder:text-muted-foreground text-base"
                      required type="email" placeholder="邮箱"
                      value={commentForm.mail}
                      onChange={e => setCommentForm(f => ({ ...f, mail: e.target.value }))}
                    />
                  </div>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition placeholder:text-muted-foreground text-base min-h-[90px] resize-none"
                    required placeholder="评论内容"
                    value={commentForm.text}
                    onChange={e => setCommentForm(f => ({ ...f, text: e.target.value }))}
                  />
                  <ClickFeedback>
                    <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                      {submitting ? '提交中...' : '提交评论'}
                    </Button>
                  </ClickFeedback>
                </motion.form>
              </div>
            </div>
            <div className="space-y-4">
              {comments.length === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400">暂无评论</motion.div>}
              {comments.map((c, idx) => (
                <motion.div
                  key={c.coid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  className="p-4 border rounded-lg bg-card shadow-sm"
                >
                  <div className="font-bold text-base">{c.author}</div>
                  <div className="text-gray-500 text-xs mb-1">{new Date(c.created * 1000).toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-relaxed break-words">{c.text}</div>
                </motion.div>
              ))}
            </div>
          </section>
        </article>
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