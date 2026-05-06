import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatIDR } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { waLink } from '@/lib/utils/whatsapp'
import { demoLeads } from '@/lib/demo-data'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Phone, Mail, CalendarDays } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: leadRaw } = await supabase
    .from('leads')
    .select('*, customers(name, phone, email), profiles(full_name)')
    .eq('id', params.id)
    .single() as any

  const lead = leadRaw || demoLeads.find(l => l.id === params.id)

  if (!lead) {
    return (
      <FadeIn>
        <p className="py-8 text-center text-text-muted">Lead not found</p>
      </FadeIn>
    )
  }

  const { data: notesRaw } = (await supabase
    .from('lead_notes')
    .select('*, profiles(full_name)')
    .eq('lead_id', params.id)
    .order('created_at', { ascending: false })) as { data: any[] | null }

  const notes = notesRaw?.length ? notesRaw : []

  const whatsappLink = lead.whatsapp
    ? waLink(lead.whatsapp, `Hi ${lead.name}, this is myCHEF regarding your private dining inquiry.`)
    : null

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-2">
          <Link href="/leads">
            <ArrowLeft className="h-5 w-5 text-text-muted" />
          </Link>
          <h1 className="text-lg font-medium">Lead Details</h1>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium">{lead.name}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant={lead.status}>{lead.status}</Badge>
                {lead.is_hot && <Badge variant="hot">HOT</Badge>}
              </div>
            </div>
            {lead.estimated_value && (
              <p className="text-lg text-accent">{formatIDR(lead.estimated_value)}</p>
            )}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {lead.phone && (
              <div className="flex items-center gap-2 text-text-muted">
                <Phone className="h-4 w-4" />
                <span>{lead.phone}</span>
              </div>
            )}
            {lead.email && (
              <div className="flex items-center gap-2 text-text-muted">
                <Mail className="h-4 w-4" />
                <span>{lead.email}</span>
              </div>
            )}
            {lead.event_date && (
              <div className="flex items-center gap-2 text-text-muted">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDateShort(lead.event_date)}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            )}
            <Link href={`/bookings/new?lead_id=${lead.id}`}>
              <Button size="sm">Create Booking</Button>
            </Link>
          </div>
        </Card>
      </FadeIn>

      <section>
        <FadeIn delay={0.2}>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Notes</h3>
        </FadeIn>
        {notes && notes.length > 0 ? (
          <StaggerContainer className="space-y-2">
            {notes.map((note: any) => (
              <StaggerItem key={note.id}>
                <Card className="p-3">
                  <p className="text-sm">{note.note}</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {(note.profiles as any)?.full_name || 'System'} &middot; {formatDateShort(note.created_at || '')}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.2}>
            <p className="py-4 text-center text-sm text-text-muted">No notes yet</p>
          </FadeIn>
        )}
      </section>
    </div>
  )
}
