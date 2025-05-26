'use client'

import { Navbar } from '@/components/navbar'
import Link from 'next/link'

export default function FriendsAddPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl mx-auto py-12 md:py-20">
          <div className="mx-auto flex flex-col items-center space-y-4 text-center mb-10">
            <h1 className="font-heading text-4xl md:text-6xl font-bold">添加友链</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              博客已重新建立，大多友链都找不回来了 qwq，欢迎重新添加
            </p>
          </div>
          <div className="bg-card/80 rounded-xl shadow p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">申请方法</h3>
            <p className="mb-2">添加本站后，在本页面留言，格式如下：</p>
            <ul className="list-disc pl-6 text-muted-foreground text-base space-y-1">
              <li>博客名：</li>
              <li>网址：</li>
              <li>简短描述：</li>
              <li>一张图片：</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 mt-6">申请注意</h3>
            <ul className="list-disc pl-6 text-muted-foreground text-base space-y-1">
              <li>需要全站开启 <span className="font-mono">HTTPS</span> 协议</li>
              <li>只接受个人 Blog 交换</li>
            </ul>
          </div>
          <div className="bg-card/80 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">本站信息</h2>
            <ul className="list-disc pl-6 text-muted-foreground text-base space-y-1">
              <li>名称: Yang's Blog</li>
              <li>网址: https://yang233.cn</li>
              <li>描述: Life is a journey.</li>
              <li>图片: http://q.qlogo.cn/headimg_dl?dst_uin=2958445350&spec=640&img_type=jpg</li>
            </ul>
            <div className="mt-4 text-base">添加请发邮件到 <a href="mailto:beitqwq@icloud.com" className="underline text-primary">beitqwq@icloud.com</a></div>
          </div>
        </section>
      </main>
    </div>
  )
} 