"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // localStorage에서 저장된 테마 설정 확인
    const savedTheme = localStorage.getItem("theme")
    const html = document.documentElement

    if (savedTheme === "dark") {
      html.classList.add("dark")
      setIsDark(true)
    } else if (savedTheme === "light") {
      html.classList.remove("dark")
      setIsDark(false)
    } else {
      // 저장된 설정이 없으면 시스템 설정 확인
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        html.classList.add("dark")
        setIsDark(true)
      } else {
        html.classList.remove("dark")
        setIsDark(false)
      }
    }

    // 시스템 설정 변경 감지
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          html.classList.add("dark")
          setIsDark(true)
        } else {
          html.classList.remove("dark")
          setIsDark(false)
        }
      }
    }
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const newIsDark = !isDark

    if (newIsDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
    setIsDark(newIsDark)
  }

  // 서버 사이드 렌더링 시 깜빡임 방지
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={className}
        aria-label="다크모드 토글"
        disabled
      >
        <Sun className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className={className}
    >
      {isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
}
