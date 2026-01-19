"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* 제목 - 왼쪽 정렬 */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Ubar
          </Link>
        </div>

        {/* 네비게이션 - 가운데 정렬 */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            홈
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            블로그
          </Link>
        </nav>

        {/* 로그인 버튼 - 오른쪽 정렬 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm">
              로그인
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
