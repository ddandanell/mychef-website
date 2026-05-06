import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/dates'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { Award, Download, Eye, CalendarDays } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PartnerCertificatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: partner } = await supabase
    .from('partners')
    .select('id, company_name')
    .eq('id', user?.id || '')
    .single() as any

  if (!partner) {
    return (
      <FadeIn>
        <div className="py-8 text-center">
          <p className="text-text-muted">Partner profile not found</p>
        </div>
      </FadeIn>
    )
  }

  const { data: certificates } = (await supabase
    .from('partner_certificates')
    .select('*')
    .eq('partner_id', partner.id)
    .order('issued_at', { ascending: false })) as { data: any[] | null }

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Certificates</h1>
      </FadeIn>

      {certificates && certificates.length > 0 ? (
        <StaggerContainer className="space-y-3">
          {certificates.map((cert) => (
            <StaggerItem key={cert.id}>
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-medium">Certificate #{cert.certificate_number}</h2>
                      {cert.is_active ? (
                        <Badge status="active">Active</Badge>
                      ) : (
                        <Badge status="draft">Inactive</Badge>
                      )}
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-text-muted">
                      {cert.issued_at && (
                        <p className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          Issued {formatDate(cert.issued_at)}
                        </p>
                      )}
                      {cert.view_count !== null && cert.view_count > 0 && (
                        <p className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {cert.view_count} views
                          {cert.last_viewed_at && ` · Last viewed ${formatDate(cert.last_viewed_at)}`}
                        </p>
                      )}
                      {cert.is_preview && (
                        <p className="text-warning">Preview certificate</p>
                      )}
                    </div>

                    <div className="mt-3">
                      <a
                        href={`/p/certificate/${cert.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm" className="gap-1.5">
                          <Download className="h-3.5 w-3.5" />
                          View / Download
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <Card className="p-8 text-center">
            <Award className="mx-auto h-8 w-8 text-text-muted" />
            <p className="mt-2 text-sm text-text-muted">No certificates found</p>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}
