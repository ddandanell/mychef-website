import { createClient } from '@/lib/supabase/server'
import { demoBookings } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDRShort } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { TrendingUp, CalendarDays, Users, Target } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  const supabase = await createClient()

  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]

  const [
    monthRes,
    leadsRes,
    convertedRes,
  ] = await Promise.all([
    supabase
      .from('bookings')
      .select('id, guests, event_date, status, booking_calculations(total_revenue)')
      .gte('event_date', startOfMonth)
      .lte('event_date', endOfMonth),
    supabase.from('leads').select('id, status, created_at'),
    supabase.from('leads').select('id, status, converted_at').not('converted_at', 'is', null),
  ]) as any

  const monthBookingsRaw: any[] | null = monthRes?.data
  const allLeadsRaw: any[] | null = leadsRes?.data
  const convertedLeadsRaw: any[] | null = convertedRes?.data

  const monthBookings = (monthBookingsRaw as any[])?.length ? monthBookingsRaw : demoBookings
  const allLeads = (allLeadsRaw as any[])?.length ? allLeadsRaw : []
  const convertedLeads = (convertedLeadsRaw as any[])?.length ? convertedLeadsRaw : []

  const totalRevenue = monthBookings?.reduce((sum, b) => {
    return sum + ((b.booking_calculations as any)?.total_revenue || 0)
  }, 0) || 0

  const totalBookings = monthBookings?.length || 0
  const avgGuests = monthBookings && monthBookings.length > 0
    ? Math.round(monthBookings.reduce((sum, b) => sum + (b.guests || 0), 0) / monthBookings.length)
    : 0

  const conversionRate = allLeads && allLeads.length > 0
    ? Math.round(((convertedLeads?.length || 0) / allLeads.length) * 100)
    : 0

  const kpis = [
    { label: 'Revenue This Month', value: formatIDRShort(totalRevenue), icon: TrendingUp },
    { label: 'Total Bookings', value: totalBookings.toString(), icon: CalendarDays },
    { label: 'Avg Guests', value: avgGuests.toString(), icon: Users },
    { label: 'Conversion Rate', value: `${conversionRate}%`, icon: Target },
  ]

  const dailyRevenue = monthBookings?.reduce<Record<string, number>>((acc, b) => {
    const date = b.event_date || 'Unknown'
    acc[date] = (acc[date] || 0) + ((b.booking_calculations as any)?.total_revenue || 0)
    return acc
  }, {})

  const chartData = Object.entries(dailyRevenue || {})
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(0, 15)

  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(([, v]) => v)) : 1

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-lg font-medium">Reports</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="p-3">
              <div className="flex items-center gap-2">
                <kpi.icon className="h-4 w-4 text-accent" />
                <span className="text-xs text-text-muted">{kpi.label}</span>
              </div>
              <p className="mt-1 text-xl font-semibold">{kpi.value}</p>
            </Card>
          ))}
        </div>
      </FadeIn>

      <section>
        <FadeIn delay={0.2}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
            Revenue by Day
          </h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <Card className="p-4">
            {chartData.length > 0 ? (
              <div className="space-y-3">
                {chartData.map(([date, value]) => {
                  const pct = Math.max(4, (value / maxValue) * 100)
                  return (
                    <div key={date} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-xs text-text-muted">
                        {formatDateShort(date)}
                      </span>
                      <div className="flex-1">
                        <div
                          className="h-5 rounded bg-accent/80"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-20 shrink-0 text-right text-xs font-medium">
                        {formatIDRShort(value)}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-text-muted">No data this month</p>
            )}
          </Card>
        </FadeIn>
      </section>

      <section>
        <FadeIn delay={0.3}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
            This Month&apos;s Bookings
          </h2>
        </FadeIn>
        {monthBookings && monthBookings.length > 0 ? (
          <StaggerContainer className="space-y-2">
            {monthBookings.map((booking) => (
              <StaggerItem key={booking.id}>
                <Link href={`/bookings/${booking.id}`}>
                  <Card className="flex items-center justify-between p-3 transition-colors hover:bg-surface/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge status={booking.status}>{booking.status}</Badge>
                        <span className="text-sm">{formatDateShort(booking.event_date)}</span>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">{booking.guests || 0} guests</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-accent">
                        {formatIDRShort((booking.booking_calculations as any)?.total_revenue)}
                      </p>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.3}>
            <p className="py-4 text-center text-sm text-text-muted">No bookings this month</p>
          </FadeIn>
        )}
      </section>
    </div>
  )
}
