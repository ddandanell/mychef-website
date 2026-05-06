import { createClient } from '@/lib/supabase/server'
import { demoAppSettings } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'

export const dynamic = 'force-dynamic'

export default async function FinancialSettingsPage() {
  const supabase = await createClient()
  const { data: settingsRaw } = (await supabase
    .from('app_settings')
    .select('*')
    .in('key', ['deposit_percent', 'partner_commission', 'ingredients_cost', 'staff_cost', 'profit_split'])) as any

  const settings = (settingsRaw as any[])?.length ? settingsRaw : demoAppSettings

  const settingMap: Record<string, any> = settings?.reduce((acc: Record<string, any>, s: any) => {
    acc[s.key] = s.value
    return acc
  }, {}) || {}

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Financial Settings</h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <p className="text-xs text-text-muted">Deposit %</p>
            <p className="mt-1 text-xl font-semibold">{settingMap.deposit_percent || 25}%</p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-text-muted">Partner Commission</p>
            <p className="mt-1 text-xl font-semibold">{settingMap.partner_commission || 10}%</p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-text-muted">Ingredients Cost</p>
            <p className="mt-1 text-xl font-semibold">{settingMap.ingredients_cost || 15}%</p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-text-muted">Staff Cost</p>
            <p className="mt-1 text-xl font-semibold">{settingMap.staff_cost || 25}%</p>
          </Card>
        </div>
      </FadeIn>
    </div>
  )
}
