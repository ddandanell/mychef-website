import { createClient } from '@/lib/supabase/server'
import { demoPartners } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { Search } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PartnersPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  const query = searchParams.q || ''

  const builder = supabase
    .from('partners')
    .select('id, company_name, area, status, villa_count')
    .order('company_name', { ascending: true })
    .limit(50)

  const { data: partnersRaw } = (query
    ? await builder.or(`company_name.ilike.%${query}%,area.ilike.%${query}%`)
    : await builder) as { data: any[] | null }
  const partners = (partnersRaw as any[])?.length ? partnersRaw : demoPartners

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Partners</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-text-muted" />
          <form className="flex-1" action="/partners">
            <Input
              name="q"
              placeholder="Search partners..."
              defaultValue={query}
              className="h-9"
            />
          </form>
        </div>
      </FadeIn>

      {partners && partners.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {partners.map((partner) => (
            <StaggerItem key={partner.id}>
              <Link href={`/partners/${partner.id}`}>
                <Card className="p-3 transition-colors hover:bg-surface/80">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{partner.company_name}</span>
                        <Badge status={partner.status}>{partner.status}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        {partner.area || 'No area'}
                        {partner.villa_count != null && ` · ${partner.villa_count} villas`}
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
          <p className="py-8 text-center text-sm text-text-muted">No partners found</p>
        </FadeIn>
      )}
    </div>
  )
}
