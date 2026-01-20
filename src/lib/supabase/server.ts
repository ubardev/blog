import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * 서버(Server Actions, Server Components)에서 사용하는 Supabase 클라이언트
 * Next.js cookies() API와 통합되어 세션을 자동으로 관리합니다.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 서버 컴포넌트에서 호출 시 무시
            // Server Actions에서는 정상 작동
          }
        },
      },
    }
  )
}
