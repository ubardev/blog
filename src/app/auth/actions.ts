'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

/**
 * 회원가입 Server Action
 */
export async function signUp(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  // 이메일 인증 필요 시 (Confirm email이 켜져 있는 경우)
  if (data.user && !data.session) {
    redirect('/login?message=' + encodeURIComponent('이메일 인증 링크를 확인해주세요'))
  }

  // 자동 로그인된 경우 (Confirm email이 꺼져 있는 경우)
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/')
  }
}

/**
 * 로그인 Server Action
 */
export async function signIn(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // SSR 라이브러리가 자동으로 쿠키 설정
  revalidatePath('/', 'layout')
  redirect('/')
}

/**
 * 로그아웃 Server Action
 */
export async function signOut() {
  const supabase = await createClient()
  
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login')
}
