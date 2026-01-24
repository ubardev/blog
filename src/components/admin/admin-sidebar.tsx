"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Settings, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "대시보드",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "포스트 관리",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "결제 내역",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "설정",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground">어드민</h2>
      </div>
      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          // /admin은 정확히 일치할 때만 활성화
          // 다른 메뉴들은 해당 경로로 시작할 때 활성화
          const isActive = item.href === "/admin"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/")
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
