import { PaymentTable } from "@/components/admin/payment-table"
import { getPayments } from "./actions"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CreditCard } from "lucide-react"

export default async function PaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const result = await getPayments()
  const payments = result.success ? result.data : []

  // 통계 계산
  const totalAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  
  const completedCount = payments.filter(p => p.status === 'completed').length
  const pendingCount = payments.filter(p => p.status === 'pending').length
  const cancelledCount = payments.filter(p => p.status === 'cancelled').length
  const failedCount = payments.filter(p => p.status === 'failed').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="size-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">결제 내역</h1>
        </div>
        <p className="text-muted-foreground">
          모든 결제 내역을 확인하고 관리하세요.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">총 결제 건수</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {payments.length}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">완료</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {completedCount}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">대기</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {pendingCount}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">취소</div>
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">
            {cancelledCount}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">총 결제 금액</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {new Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            }).format(totalAmount)}
          </div>
        </div>
      </div>

      <PaymentTable payments={payments} />
    </div>
  )
}
