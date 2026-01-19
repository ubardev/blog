"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut } from "lucide-react"

export function AdminHeader() {
  const handleLogout = () => {
    console.log("로그아웃")
    // 실제 로그아웃 로직은 나중에 구현
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
          >
            블로그로 돌아가기
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="size-4" />
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  )
}
