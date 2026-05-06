import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils/dates'
import { waLink } from '@/lib/utils/whatsapp'
import { CheckCircle, Shield, Calendar, Award, MapPin, Phone } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CertifiedPage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  const { data: cert } = await supabase
    .from('partner_certificates')
    .select('*, partners(company_name, villa_name, area, address, whatsapp, email)')
    .eq('token', params.token)
    .single() as any

  if (!cert) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-error">Certificate Not Found</h1>
          <p className="mt-4 text-text-muted">This verification link is invalid or has expired.</p>
        </Card>
      </div>
    )
  }

  await (supabase
    .from('partner_certificates') as any)
    .update({
      view_count: (cert.view_count || 0) + 1,
      last_viewed_at: new Date().toISOString(),
    })
    .eq('id', cert.id)

  const partner = cert.partners as any
  const bookLink = partner?.whatsapp
    ? waLink(partner.whatsapp, `Hi myCHEF, I'd like to book a private dining experience at ${partner.villa_name || partner.company_name}.`)
    : partner?.email
    ? `mailto:${partner.email}`
    : '#'

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">myCHEF</h1>
          <p className="mt-2 text-sm text-text-muted">Partner Verification</p>
        </div>

        <Card highlight className="relative overflow-hidden p-8 text-center">
          <div className="absolute inset-x-0 top-0 h-1 bg-accent" />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Award className="h-8 w-8 text-accent" />
          </div>

          <h2 className="mt-4 text-xl font-medium text-text-primary">Verified Partner</h2>
          <p className="mt-1 text-lg text-accent">{partner?.company_name}</p>
          {partner?.villa_name && (
            <p className="text-sm text-text-muted">{partner.villa_name}</p>
          )}

          <div className="mt-6 space-y-3 text-sm text-text-muted">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <span>Certificate #{cert.certificate_number}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Issued {cert.issued_at ? formatDate(cert.issued_at) : '-'}</span>
            </div>
            {partner?.area && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{partner.area}</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <Badge status="active">
              <CheckCircle className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium text-text-primary">Book at this Villa</h3>
          <p className="mt-2 text-sm text-text-muted">
            Enjoy a curated private dining experience with myCHEF at {partner?.villa_name || partner?.company_name}.
          </p>
          <a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-4 block">
            <Button className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </a>
        </Card>
      </div>
    </div>
  )
}
