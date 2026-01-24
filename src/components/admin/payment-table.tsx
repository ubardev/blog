"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, XCircle, Clock, AlertCircle } from "lucide-react"
import type { Payment } from "@/app/admin/payments/actions"

interface PaymentTableProps {
  payments: Payment[]
}

function PaymentStatusBadge({ status }: { status: Payment['status'] }) {
  const variants = {
    completed: {
      variant: "default" as const,
      label: "완료",
      icon: BadgeCheck,
      className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    },
    pending: {
      variant: "secondary" as const,
      label: "대기",
      icon: Clock,
      className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    },
    cancelled: {
      variant: "destructive" as const,
      label: "취소",
      icon: XCircle,
      className: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
    },
    failed: {
      variant: "destructive" as const,
      label: "실패",
      icon: AlertCircle,
      className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    },
  }

  const config = variants[status]
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant}
      className={`gap-1 ${config.className}`}
    >
      <Icon className="size-3" />
      {config.label}
    </Badge>
  )
}

function formatAmount(amount: number, currency: string = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">주문 ID</TableHead>
            <TableHead className="w-32">결제 키</TableHead>
            <TableHead>사용자</TableHead>
            <TableHead>포스트</TableHead>
            <TableHead className="w-32 text-right">금액</TableHead>
            <TableHead className="w-24">상태</TableHead>
            <TableHead className="w-40">결제일시</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                결제 내역이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className="font-mono text-xs">
                    {payment.order_id}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-xs text-muted-foreground truncate max-w-[120px]">
                    {payment.payment_key}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-medium text-foreground">
                      {payment.user?.name || '알 수 없음'}
                    </div>
                    {payment.user?.email && (
                      <div className="text-xs text-muted-foreground">
                        {payment.user.email}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {payment.post ? (
                    <Link
                      href={`/blog/${payment.post.slug}`}
                      className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {payment.post.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">삭제된 포스트</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatAmount(payment.amount, payment.currency)}
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(payment.paid_at)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
