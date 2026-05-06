import { createClient } from '@/lib/supabase/server'
import { demoAppSettings } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const dynamic = 'force-dynamic'

export default async function AppSettingsPage() {
  const supabase = await createClient()
  const { data: settingsRaw } = await supabase
    .from('app_settings')
    .select('*')
    .order('key') as { data: any[] | null }
  const settings = (settingsRaw as any[])?.length ? settingsRaw : demoAppSettings

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">App Settings</h1>
      </FadeIn>
      {settings && settings.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {settings.map((setting) => (
            <StaggerItem key={setting.key}>
              <Card className="p-4">
                <p className="text-sm font-medium capitalize">{setting.key.replace(/_/g, ' ')}</p>
                <p className="mt-1 text-sm text-text-muted">
                  {typeof setting.value === 'string' ? setting.value : JSON.stringify(setting.value)}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No settings found</p>
        </FadeIn>
      )}
    </div>
  )
}
