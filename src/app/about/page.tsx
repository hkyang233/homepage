'use client'
import { Navbar } from '@/components/navbar'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-2xl mx-auto py-12 md:py-20">
          <div className="mx-auto flex flex-col items-center space-y-4 text-center mb-10">
            <h1 className="font-heading text-4xl md:text-6xl font-bold">About</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Life is never perfect, but if you keep your face toward the sunshine, the shadows will fall behind you.
            </p>
          </div>

          {/* 我是谁 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8">
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我是谁 / Who</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default">Boy</Badge>
                <Badge variant="secondary">19岁</Badge>
                <Badge variant="info">广东人</Badge>
                <Badge variant="success">INFP-T</Badge>
                <Badge variant="outline">🏝️ 摆烂中</Badge>
              </div>
              <p className="text-base text-muted-foreground">
                Hi~ 我是 Yang，一名正在探索前端开发的大学生。<br />
                喜欢折腾各种技术项目，热爱 Coding 和新挑战。
              </p>
            </div>
          </div>

          {/* 我的技能 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8">
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我的技能 / Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">代码</h3>
                  <ul className="list-disc list-inside text-muted-foreground text-base space-y-1">
                    <li>HTML / CSS / JavaScript</li>
                    <li>TypeScript, React, Next.js ...</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">其它</h3>
                  <ul className="list-disc list-inside text-muted-foreground text-base space-y-1">
                    <li>Premiere Pro, Photoshop, Illustrator, Lightroom</li>
                    <li>AutoCAD / Revit ...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 我的设备 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8">
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我的设备 / Devices</h2>
              <ul className="list-disc list-inside text-muted-foreground text-base space-y-1">
                <li>拯救者 Y7000 2024</li>
                <li>iPhone 14 Pro</li>
                <li>Apple Watch Series 9</li>
                <li>AirPods Pro 2</li>
              </ul>
            </div>
          </div>

          {/* 联系我 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm">
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">联系我 / Contact</h2>
              <ul className="text-base text-muted-foreground space-y-1">
                <li>GitHub: <a href="https://github.com/hkyang233" className="text-primary hover:underline" target="_blank" rel="noreferrer">hkyang233</a></li>
                <li>Email: <a href="mailto:beitqwq@icloud.com" className="text-primary hover:underline">beitqwq@icloud.com</a></li>
              </ul>
            </div>
          </div>
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