import { createClient } from '@/lib/supabase/server'
import { demoMenus } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { formatIDR } from '@/lib/utils/currency'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const dynamic = 'force-dynamic'

export default async function MenusSettingsPage() {
  const supabase = await createClient()
  const { data: menusRaw } = await supabase
    .from('menus')
    .select('*')
    .order('name') as { data: any[] | null }
  const menus = (menusRaw as any[])?.length ? menusRaw : demoMenus

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Menus & Pricing</h1>
      </FadeIn>
      {menus && menus.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {menus.map((menu) => (
            <StaggerItem key={menu.id}>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{menu.name}</p>
                    <p className="text-xs text-text-muted">{menu.type} &middot; {menu.min_guests || 4}+ guests</p>
                    {menu.description && <p className="mt-1 text-sm text-text-muted">{menu.description}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-accent">{formatIDR(menu.price_per_person)}</p>
                    <p className="text-xs text-text-muted">per person</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No menus found</p>
        </FadeIn>
      )}
    </div>
  )
}
