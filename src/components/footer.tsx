"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EmailCta } from "@/components/email-cta"
import { cn } from "@/lib/utils"
import { Instagram, Facebook, Youtube, Github, Moon, Sun } from "lucide-react"

export interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 초기 다크모드 상태 확인
    const html = document.documentElement
    const isDarkMode = html.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-background",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* 브랜드 섹션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">코드패토리</h3>
            <p className="text-sm text-muted-foreground">
              모던한 웹 개발과 기술 트렌드를 공유하는 블로그입니다.
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="다크모드 토글"
                className="h-9 w-9"
              >
                {isDark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
              <span className="text-xs text-muted-foreground">
                {isDark ? "라이트 모드" : "다크 모드"}
              </span>
            </div>
          </div>

          {/* 빠른 네비게이션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">빠른 링크</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                홈
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                블로그
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                소개
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                문의
              </Link>
            </nav>
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">연락처</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <a
                href="mailto:bellin83@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                bellin83@gmail.com
              </a>
              <a
                href="tel:010-1234-1234"
                className="hover:text-foreground transition-colors"
              >
                010-1234-1234
              </a>
            </div>
          </div>

          {/* 소셜 미디어 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">소셜 미디어</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="size-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 이메일 구독 섹션 */}
        <div className="border-t border-border pt-8">
          <div className="max-w-md mx-auto">
            <EmailCta
              title="최신 포스트를 이메일로 받아보세요"
              placeholder="이메일을 입력하세요"
              buttonText="구독하기"
              onSubmit={async (email) => {
                console.log("구독 이메일:", email)
                await new Promise((resolve) => setTimeout(resolve, 1000))
                alert(`구독 완료: ${email}`)
              }}
            />
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 코드패토리. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
