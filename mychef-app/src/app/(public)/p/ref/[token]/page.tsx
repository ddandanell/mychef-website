import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ContactForm } from './contact-form'

export const dynamic = 'force-dynamic'

export default async function ReferralPage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  const { data: referral } = await (supabase as any)
    .from('referrals')
    .select('*')
    .eq('token', params.token)
    .single()

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">myCHEF</h1>
          <p className="mt-2 text-sm text-text-muted">Exclusive Private Dining</p>
        </div>

        {referral ? (
          <Card className="p-6 text-center">
            <Badge status="active">Referral</Badge>
            <h2 className="mt-3 text-lg font-medium text-text-primary">{referral.name || 'Special Invitation'}</h2>
            {referral.description && (
              <p className="mt-2 text-sm text-text-muted">{referral.description}</p>
            )}
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <h2 className="text-lg font-medium text-text-primary">Join the Experience</h2>
            <p className="mt-2 text-sm text-text-muted">
              You've been referred to myCHEF. Leave your details and we'll be in touch.
            </p>
          </Card>
        )}

        <ContactForm token={params.token} />
      </div>
    </div>
  )
}
