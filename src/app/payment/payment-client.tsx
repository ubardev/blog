"use client"

import { PaymentWidget } from "@/components/payment-widget"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

interface PaymentPageClientProps {
  amount: number
  orderName: string
  postId?: string
}

export function PaymentPageClient({ amount, orderName, postId }: PaymentPageClientProps) {
  const [customerEmail, setCustomerEmail] = useState<string>("")
  const [customerName, setCustomerName] = useState<string>("")
  const [customerMobilePhone, setCustomerMobilePhone] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // 전화번호 정규화 함수: 숫자만 추출
  const normalizePhoneNumber = (phone: string): string => {
    if (!phone) return ""
    return phone.replace(/[^0-9]/g, "")
  }

  useEffect(() => {
    async function loadUserInfo() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setCustomerEmail(user.email || "")
        // user_metadata에서 이름과 전화번호 가져오기
        setCustomerName(user.user_metadata?.name || "")
        // 전화번호는 정규화해서 저장 (하이픈 제거)
        const phone = user.user_metadata?.phone || ""
        setCustomerMobilePhone(normalizePhoneNumber(phone))
      }
      setIsLoading(false)
    }

    loadUserInfo()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <PaymentWidget
      amount={amount}
      orderName={orderName}
      customerEmail={customerEmail}
      customerName={customerName}
      customerMobilePhone={customerMobilePhone}
      postId={postId}
    />
  )
}
