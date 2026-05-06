import { createClient } from '@/lib/supabase/server'
import { demoTeam } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TeamSettingsPage() {
  const supabase = await createClient()
  const { data: teamRaw } = await supabase
    .from('profiles')
    .select('id, full_name, role, whatsapp, is_active')
    .order('role')
    .limit(50) as { data: any[] | null }
  const team = (teamRaw as any[])?.length ? teamRaw : demoTeam

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Team Members</h1>
      </FadeIn>
      {team && team.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <Card className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{member.full_name}</p>
                  <p className="text-xs text-text-muted">{member.whatsapp || 'No WhatsApp'}</p>
                </div>
                <div className="text-right">
                  <Badge variant={member.role}>{member.role}</Badge>
                  {member.is_active === false && <p className="mt-1 text-xs text-error">Inactive</p>}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No team members found</p>
        </FadeIn>
      )}
    </div>
  )
}
