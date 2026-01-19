import { DashboardStats } from "@/components/admin/dashboard-stats"
import { DashboardRecentPosts } from "@/components/admin/dashboard-recent-posts"
import { getAllPosts } from "@/lib/blog-data"

export default function AdminDashboard() {
  const allPosts = getAllPosts()
  const publishedPosts = allPosts // 현재는 모두 발행된 것으로 간주
  const draftPosts: typeof allPosts = [] // 임시저장 포스트는 없음

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">대시보드</h1>
        <p className="text-muted-foreground mt-2">
          블로그 관리 대시보드입니다.
        </p>
      </div>

      <DashboardStats
        totalPosts={allPosts.length}
        publishedPosts={publishedPosts.length}
        draftPosts={draftPosts.length}
      />

      <DashboardRecentPosts posts={allPosts} />
    </div>
  )
}
