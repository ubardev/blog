import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 이메일 인증 콜백 Route Handler
 * Supabase에서 이메일 인증 링크를 클릭하면 이 엔드포인트로 리다이렉트됩니다.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = await createClient()
    
    // SSR 라이브러리가 자동으로 code를 세션으로 교환
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 인증 성공 시 리다이렉트
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    }
  }

  // 에러 발생 시 로그인 페이지로
  return NextResponse.redirect(new URL('/login?error=' + encodeURIComponent('인증에 실패했습니다'), requestUrl.origin))
}
