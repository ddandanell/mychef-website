import { createClient } from '@/lib/supabase/server'
import { demoPartners } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { MapPin, Building2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PartnersDirectoryPage() {
  const supabase = await createClient()
  const { data: partnersRaw } = (await supabase
    .from('partners')
    .select('id, company_name, villa_name, area, villa_count, has_kitchen, has_equipment, status')
    .eq('status', 'active')
    .eq('show_in_directory', true)
    .order('company_name')) as { data: any[] | null }
  const partners = (partnersRaw as any[])?.length ? partnersRaw : demoPartners

  return (
    <div className="space-y-6 px-4 py-8">
      <FadeIn>
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">Partner Villas</h1>
          <p className="mt-2 text-sm text-text-muted">Curated luxury villas across Bali</p>
        </div>
      </FadeIn>

      {partners && partners.length > 0 ? (
        <StaggerContainer className="space-y-3">
          {partners.map((partner) => (
            <StaggerItem key={partner.id}>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{partner.company_name}</h3>
                    {partner.villa_name && (
                      <p className="text-sm text-text-muted">{partner.villa_name}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {partner.area && (
                        <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                          <MapPin className="h-3 w-3" />
                          {partner.area}
                        </span>
                      )}
                      {partner.villa_count && (
                        <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                          <Building2 className="h-3 w-3" />
                          {partner.villa_count} villas
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {partner.has_kitchen && (
                        <Badge variant="success">Kitchen</Badge>
                      )}
                      {partner.has_equipment && (
                        <Badge variant="success">Equipped</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No partner villas listed yet</p>
        </FadeIn>
      )}
    </div>
  )
}
