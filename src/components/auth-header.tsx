"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * 클라이언트 컴포넌트에서 인증 상태를 확인하는 헤더 부분
 * SSR 라이브러리를 사용하여 클라이언트에서도 세션을 확인할 수 있습니다.
 */
export function AuthHeader() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // 현재 사용자 확인
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setIsLoading(false)
    })

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          ...
        </Button>
      </div>
    )
  }

  if (user) {
    return (
      <form action={signOut}>
        <Button type="submit" variant="outline" size="sm">
          로그아웃
        </Button>
      </form>
    )
  }

  return (
    <Link href="/login">
      <Button variant="outline" size="sm">
        로그인
      </Button>
    </Link>
  )
}
