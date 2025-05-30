import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yang's Homepage",
  description: "Yang's Homepage",
  keywords: ["Next.js", "React", "TypeScript", "个人主页", "博客"],
  authors: [{ name: "yang" }],
  openGraph: {
    title: "Yang's Homepage",
    description: "Yang's Homepage",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
