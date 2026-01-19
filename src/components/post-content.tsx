import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export interface PostContentProps {
  content?: string
  children?: ReactNode
  className?: string
}

export function PostContent({
  content,
  children,
  className,
}: PostContentProps) {
  // children이 있으면 children을 우선 사용
  if (children) {
    return (
      <div
        className={cn(
          "prose prose-slate dark:prose-invert max-w-none",
          "prose-headings:font-bold prose-headings:text-foreground",
          "prose-p:text-foreground prose-p:leading-7",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          "prose-strong:text-foreground prose-strong:font-semibold",
          "prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
          "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
          "prose-img:rounded-lg prose-img:mx-auto",
          "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-li:marker:text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    )
  }

  // content가 있으면 마크다운으로 렌더링 (나중에 react-markdown 추가 가능)
  if (content) {
    return (
      <div
        className={cn(
          "prose prose-slate dark:prose-invert max-w-none",
          "prose-headings:font-bold prose-headings:text-foreground",
          "prose-p:text-foreground prose-p:leading-7",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          "prose-strong:text-foreground prose-strong:font-semibold",
          "prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
          "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
          "prose-img:rounded-lg prose-img:mx-auto",
          "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-li:marker:text-muted-foreground",
          "whitespace-pre-wrap",
          className
        )}
      >
        {content.split("\n").map((line, index) => {
          // 간단한 마크다운 파싱 (기본적인 처리)
          if (line.startsWith("# ")) {
            return (
              <h1 key={index} className="text-4xl font-bold mt-8 mb-4">
                {line.substring(2)}
              </h1>
            )
          }
          if (line.startsWith("## ")) {
            return (
              <h2 key={index} className="text-3xl font-bold mt-6 mb-3">
                {line.substring(3)}
              </h2>
            )
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={index} className="text-2xl font-bold mt-4 mb-2">
                {line.substring(4)}
              </h3>
            )
          }
          if (line.trim() === "") {
            return <br key={index} />
          }
          return (
            <p key={index} className="mb-4">
              {line}
            </p>
          )
        })}
      </div>
    )
  }

  return null
}
