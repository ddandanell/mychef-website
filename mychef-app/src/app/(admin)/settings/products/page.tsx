import { createClient } from '@/lib/supabase/server'
import { demoProducts } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDR } from '@/lib/utils/currency'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const dynamic = 'force-dynamic'

export default async function ProductsSettingsPage() {
  const supabase = await createClient()
  const { data: productsRaw } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name') as { data: any[] | null }
  const products = (productsRaw as any[])?.length ? productsRaw : demoProducts

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Products</h1>
      </FadeIn>
      {products && products.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.category} &middot; {product.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent">{formatIDR(product.sales_price)}</p>
                    <p className="text-xs text-text-muted">Cost: {formatIDR(product.cost_price)}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No products found</p>
        </FadeIn>
      )}
    </div>
  )
}
