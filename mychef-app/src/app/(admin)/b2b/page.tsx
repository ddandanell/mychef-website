import { createClient } from '@/lib/supabase/server'
import { demoB2B } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { Search } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function B2BPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  const query = searchParams.q || ''

  const builder = supabase
    .from('b2b_customers')
    .select('id, company_name, contact_name, phone, email, commission_rate, created_at')
    .order('company_name', { ascending: true })
    .limit(50)

  const { data: b2bCustomersRaw } = (query
    ? await builder.or(`company_name.ilike.%${query}%,contact_name.ilike.%${query}%,phone.ilike.%${query}%`)
    : await builder) as { data: any[] | null }
  const b2bCustomers = (b2bCustomersRaw as any[])?.length ? b2bCustomersRaw : demoB2B

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">B2B Customers</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-text-muted" />
          <form className="flex-1" action="/b2b">
            <Input
              name="q"
              placeholder="Search B2B customers..."
              defaultValue={query}
              className="h-9"
            />
          </form>
        </div>
      </FadeIn>

      {b2bCustomers && b2bCustomers.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {b2bCustomers.map((b2b) => (
            <StaggerItem key={b2b.id}>
              <Link href={`/b2b/${b2b.id}`}>
                <Card className="p-3 transition-colors hover:bg-surface/80">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{b2b.company_name}</p>
                      <p className="mt-1 text-xs text-text-muted">
                        {b2b.contact_name}
                        {b2b.phone && ` · ${b2b.phone}`}
                      </p>
                      {b2b.email && (
                        <p className="text-xs text-text-muted">{b2b.email}</p>
                      )}
                    </div>
                    <div className="ml-2 text-right">
                      {b2b.commission_rate != null && (
                        <p className="text-xs text-accent">{b2b.commission_rate}%</p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No B2B customers found</p>
        </FadeIn>
      )}
    </div>
  )
}
