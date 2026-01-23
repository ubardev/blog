import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostsPageClient } from "./posts-client"
import { getPosts } from "./actions"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"

export default async function PostsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const result = await getPosts()
  const posts = result.success ? result.data : []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">포스트 관리</h1>
          <p className="text-muted-foreground mt-2">
            블로그 포스트를 관리하고 편집하세요.
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="size-4" />
            새 포스트 작성
          </Button>
        </Link>
      </div>

      <PostsPageClient initialPosts={posts} />
    </div>
  )
}
