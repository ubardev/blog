"use client"

import { useRouter } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"

interface EditPostClientProps {
  post: BlogPost
}

export function EditPostClient({ post }: EditPostClientProps) {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("포스트 수정:", data)
    // 실제 수정 로직은 나중에 구현
    // 저장 후 목록 페이지로 이동
    router.push("/admin/posts")
  }

  const handleCancel = () => {
    router.push("/admin/posts")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            목록으로
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">포스트 수정</h1>
          <p className="text-muted-foreground mt-2">
            블로그 포스트를 수정하세요.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <PostForm
          initialData={post}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}
