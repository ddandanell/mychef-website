import { createClient } from '@/lib/supabase/server'
import { demoLeads } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatIDRShort } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { Fab } from '@/components/ui/fab'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function LeadsPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  const query = searchParams.q || ''

  let dbQuery = supabase
    .from('leads')
    .select('id, name, status, phone, follow_up_date, estimated_value, is_hot, event_date, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
  }

  const { data: leadsRaw } = (await dbQuery) as { data: any[] | null }
  const leads = (leadsRaw as any[])?.length ? leadsRaw : demoLeads

  return (
    <div className="space-y-4">
      <FadeIn>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-text-muted" />
          <form className="flex-1" action="/leads">
            <Input
              name="q"
              placeholder="Search leads..."
              defaultValue={query}
              className="h-9"
            />
          </form>
        </div>
      </FadeIn>

      {leads && leads.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {leads.map((lead) => (
            <StaggerItem key={lead.id}>
              <Link href={`/leads/${lead.id}`}>
                <Card className={`p-3 transition-colors hover:bg-surface/80 ${lead.is_hot ? 'border-l-2 border-l-accent' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{lead.name}</span>
                        {lead.is_hot && <Badge variant="hot">HOT</Badge>}
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        {lead.phone || 'No phone'}
                        {lead.event_date && ` · ${formatDateShort(lead.event_date)}`}
                      </p>
                    </div>
                    <div className="ml-2 text-right">
                      <Badge variant={lead.status}>{lead.status}</Badge>
                      {lead.estimated_value ? (
                        <p className="mt-1 text-xs text-accent">{formatIDRShort(lead.estimated_value)}</p>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No leads found</p>
        </FadeIn>
      )}

      <Fab href="/leads/new" />
    </div>
  )
}
