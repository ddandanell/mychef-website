import { createClient } from '@/lib/supabase/server'
import { demoPartners, demoPayouts } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDR, formatIDRShort } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { TrendingUp, Wallet, CalendarDays } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PartnerCommissionPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: partnerRaw } = await supabase
    .from('partners')
    .select('id')
    .eq('id', user?.id || '')
    .single() as any

  const partner = partnerRaw || demoPartners[0]

  if (!partner) {
    return (
      <FadeIn>
        <div className="py-8 text-center">
          <p className="text-text-muted">Partner profile not found</p>
        </div>
      </FadeIn>
    )
  }

  const statusFilter = searchParams.status

  let query = supabase
    .from('partner_payouts')
    .select('id, amount, due_date, status, booking_id, paid_at')
    .eq('partner_id', partner.id)
    .order('due_date', { ascending: false })

  if (statusFilter) {
    query = query.eq('status', statusFilter)
  }

  const { data: payoutsRaw } = (await query) as { data: any[] | null }
  const payouts = (payoutsRaw as any[])?.length ? payoutsRaw : demoPayouts

  const totalPaid = payouts?.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0) || 0
  const totalPending = payouts?.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0) || 0
  const totalOverdue = payouts?.filter((p) => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0) || 0

  const filters = [
    { label: 'All', value: '', count: undefined },
    { label: 'Pending', value: 'pending', count: payouts?.filter((p) => p.status === 'pending').length },
    { label: 'Paid', value: 'paid', count: payouts?.filter((p) => p.status === 'paid').length },
    { label: 'Overdue', value: 'overdue', count: payouts?.filter((p) => p.status === 'overdue').length },
  ]

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Payouts</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-accent" />
              <span className="text-xs text-text-muted">Paid</span>
            </div>
            <p className="mt-1 text-xl font-semibold">{formatIDRShort(totalPaid)}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <span className="text-xs text-text-muted">Pending</span>
            </div>
            <p className="mt-1 text-xl font-semibold">{formatIDRShort(totalPending)}</p>
          </Card>
        </div>
      </FadeIn>

      {totalOverdue > 0 && (
        <FadeIn delay={0.15}>
          <Card className="border-error/30 bg-error/5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-error">Overdue</span>
              <span className="text-sm font-medium text-error">{formatIDR(totalOverdue)}</span>
            </div>
          </Card>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <Link
              key={f.value || 'all'}
              href={f.value ? `/commission?status=${f.value}` : '/commission'}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                (statusFilter || '') === f.value
                  ? 'bg-accent text-background'
                  : 'border border-border bg-surface text-text-muted hover:text-text-primary'
              }`}
            >
              {f.label}
              {f.count !== undefined && ` (${f.count})`}
            </Link>
          ))}
        </div>
      </FadeIn>

      {payouts && payouts.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {payouts.map((payout) => (
            <StaggerItem key={payout.id}>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge status={payout.status}>{payout.status}</Badge>
                      {payout.booking_id && (
                        <span className="text-xs text-text-muted">Booking</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-text-muted">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        Due {formatDate(payout.due_date)}
                      </span>
                      {payout.paid_at && (
                        <span className="ml-2">Paid {formatDate(payout.paid_at)}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm font-medium">{formatIDR(payout.amount)}</span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No payouts found</p>
        </FadeIn>
      )}
    </div>
  )
}
