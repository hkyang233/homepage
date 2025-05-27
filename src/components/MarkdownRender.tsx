import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"

export default function MarkdownRender({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-lg prose-img:max-w-[90%]">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({node, ...props}) => (
            <img
              {...props}
              className="rounded-xl mx-auto shadow-lg max-w-full h-auto"
              style={{ maxHeight: 480, objectFit: "contain" }}
              alt={props.alt || ""}
            />
          ),
          pre: ({node, ...props}) => (
            <pre
              {...props}
              className="rounded-xl p-4 overflow-x-auto shadow-lg my-6"
              style={{ fontSize: 15, lineHeight: 1.7 }}
            />
          ),
          code: ({node, ...props}) => (
            <code
              {...props}
              className="font-mono text-sm bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      <style jsx global>{`
        .hljs, .prose pre, .prose pre code {
          background: #23272e !important;
          color: #fff !important;
        }
        .prose pre {
          border-radius: 0.75rem;
          padding: 1.2em 1em;
          font-size: 15px;
          line-height: 1.7;
          overflow-x: auto;
          margin: 1.5em 0;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
        }
        .prose code {
          font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', monospace;
        }
        .prose pre::-webkit-scrollbar {
          height: 8px;
          background: #23272e;
        }
        .prose pre::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
