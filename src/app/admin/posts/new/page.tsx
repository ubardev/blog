import { PostForm } from "@/components/admin/post-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
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
          <h1 className="text-3xl font-bold text-foreground">새 포스트 작성</h1>
          <p className="text-muted-foreground mt-2">
            새로운 블로그 포스트를 작성하세요.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <PostForm />
      </div>
    </div>
  )
}
