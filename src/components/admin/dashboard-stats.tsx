import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock } from "lucide-react"

interface DashboardStatsProps {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
}

export function DashboardStats({
  totalPosts,
  publishedPosts,
  draftPosts,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "전체 포스트",
      value: totalPosts,
      icon: FileText,
      description: "모든 포스트",
    },
    {
      title: "발행된 포스트",
      value: publishedPosts,
      icon: CheckCircle,
      description: "공개된 포스트",
    },
    {
      title: "임시저장",
      value: draftPosts,
      icon: Clock,
      description: "임시저장된 포스트",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
