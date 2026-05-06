import { createClient } from '@/lib/supabase/server'
import { demoCustomers } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { Search } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CustomersPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  const query = searchParams.q || ''

  const builder = supabase
    .from('customers')
    .select('id, name, phone, email, is_returning, is_vip, created_at')
    .order('name', { ascending: true })
    .limit(50)

  const { data: customersRaw } = (query
    ? await builder.or(`name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`)
    : await builder) as { data: any[] | null }
  const customers = (customersRaw as any[])?.length ? customersRaw : demoCustomers

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Customers</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-text-muted" />
          <form className="flex-1" action="/customers">
            <Input
              name="q"
              placeholder="Search customers..."
              defaultValue={query}
              className="h-9"
            />
          </form>
        </div>
      </FadeIn>

      {customers && customers.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {customers.map((customer) => (
            <StaggerItem key={customer.id}>
              <Link href={`/customers/${customer.id}`}>
                <Card className="p-3 transition-colors hover:bg-surface/80">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{customer.name}</span>
                        {customer.is_vip && <Badge status="hot">VIP</Badge>}
                        {customer.is_returning && <Badge status="success">Returning</Badge>}
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        {customer.phone || 'No phone'}
                        {customer.email && ` · ${customer.email}`}
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
          <p className="py-8 text-center text-sm text-text-muted">No customers found</p>
        </FadeIn>
      )}
    </div>
  )
}
