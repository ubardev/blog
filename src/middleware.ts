import { createClient } from '@/lib/supabase/middleware'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 인증 미들웨어
 * 보호된 라우트에 대한 접근 제어를 수행합니다.
 */
export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  
  // 세션 갱신 (SSR 라이브러리가 자동 처리)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 보호된 라우트 체크
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 로그인/회원가입 페이지는 인증된 사용자 리다이렉트
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/signup',
    '/auth/callback',
  ],
}
