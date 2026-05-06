import { createClient } from '@/lib/supabase/server'
import { demoWhatsAppTemplates } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const dynamic = 'force-dynamic'

export default async function WhatsAppSettingsPage() {
  const supabase = await createClient()
  const { data: templatesRaw } = await supabase
    .from('whatsapp_templates')
    .select('*')
    .eq('is_active', true)
    .order('name') as { data: any[] | null }
  const templates = (templatesRaw as any[])?.length ? templatesRaw : demoWhatsAppTemplates

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">WhatsApp Templates</h1>
      </FadeIn>
      {templates && templates.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {templates.map((template) => (
            <StaggerItem key={template.id}>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{template.name}</p>
                    <Badge variant={template.category || 'offer'} className="mt-1">{template.category}</Badge>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-text-muted">{template.body}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No templates found</p>
        </FadeIn>
      )}
    </div>
  )
}
