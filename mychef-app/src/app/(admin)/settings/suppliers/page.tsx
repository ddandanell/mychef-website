import { createClient } from '@/lib/supabase/server'
import { demoSuppliers } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const dynamic = 'force-dynamic'

export default async function SuppliersSettingsPage() {
  const supabase = await createClient()
  const { data: suppliersRaw } = await supabase
    .from('suppliers')
    .select('*')
    .eq('is_active', true)
    .order('company_name') as { data: any[] | null }
  const suppliers = (suppliersRaw as any[])?.length ? suppliersRaw : demoSuppliers

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Suppliers</h1>
      </FadeIn>
      {suppliers && suppliers.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {suppliers.map((supplier) => (
            <StaggerItem key={supplier.id}>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{supplier.company_name}</p>
                    <p className="text-xs text-text-muted">{supplier.contact_name || 'No contact'}</p>
                    <p className="text-xs text-text-muted">{supplier.phone || 'No phone'}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={supplier.payment_type || 'cash'}>{supplier.payment_type || 'cash'}</Badge>
                    {supplier.has_delivery && <p className="mt-1 text-xs text-success">Delivery</p>}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No suppliers found</p>
        </FadeIn>
      )}
    </div>
  )
}
