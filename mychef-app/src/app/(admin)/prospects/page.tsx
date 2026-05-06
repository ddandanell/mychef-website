import { createClient } from '@/lib/supabase/server'
import { demoProspects } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { Search } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProspectsPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  const query = searchParams.q || ''

  const builder = supabase
    .from('partner_prospects')
    .select('id, company_name, status, area, assigned_to, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  const { data: prospectsRaw } = (query
    ? await builder.or(`company_name.ilike.%${query}%,area.ilike.%${query}%`)
    : await builder) as { data: any[] | null }
  const prospects = (prospectsRaw as any[])?.length ? prospectsRaw : demoProspects

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Prospects</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-text-muted" />
          <form className="flex-1" action="/prospects">
            <Input
              name="q"
              placeholder="Search prospects..."
              defaultValue={query}
              className="h-9"
            />
          </form>
        </div>
      </FadeIn>

      {prospects && prospects.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {prospects.map((prospect) => (
            <StaggerItem key={prospect.id}>
              <Link href={`/prospects/${prospect.id}`}>
                <Card className="p-3 transition-colors hover:bg-surface/80">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{prospect.company_name}</span>
                        <Badge status={prospect.status}>{prospect.status}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        {prospect.area || 'No area'}
                        {prospect.assigned_to && ` · Assigned`}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No prospects found</p>
        </FadeIn>
      )}
    </div>
  )
}
