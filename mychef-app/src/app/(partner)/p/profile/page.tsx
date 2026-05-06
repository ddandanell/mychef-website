'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { FadeIn } from '@/components/ui/fade-in'
import { User, Building2, MapPin, CreditCard, Loader2 } from 'lucide-react'

export default function PartnerProfilePage() {
  const supabase = createClient()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    whatsapp: '',
    email: '',
    villa_name: '',
    area: '',
    bank_account: '',
    bank_name: '',
  })

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: partner } = await supabase
        .from('partners')
        .select('*')
        .eq('id', user.id)
        .single() as any

      if (partner) {
        setForm({
          company_name: partner.company_name || '',
          contact_name: partner.contact_name || '',
          whatsapp: partner.whatsapp || '',
          email: partner.email || '',
          villa_name: partner.villa_name || '',
          area: partner.area || '',
          bank_account: partner.bank_account || '',
          bank_name: partner.bank_name || '',
        })
      }
      setIsLoading(false)
    }

    loadProfile()
  }, [supabase])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      showToast('Not authenticated', 'error')
      setIsSaving(false)
      return
    }

    const { error } = await (supabase
      .from('partners') as any)
      .update({
        company_name: form.company_name,
        contact_name: form.contact_name,
        whatsapp: form.whatsapp || null,
        email: form.email || null,
        villa_name: form.villa_name || null,
        area: form.area || null,
        bank_account: form.bank_account || null,
        bank_name: form.bank_name || null,
      })
      .eq('id', user.id)

    setIsSaving(false)

    if (error) {
      showToast(error.message, 'error')
      return
    }

    showToast('Profile updated', 'success')
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <FadeIn>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Profile</h1>
          {!isEditing && (
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2">
              <Building2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Company</span>
            </div>

            <Input
              label="Company Name"
              value={form.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              disabled={!isEditing}
            />

            <Input
              label="Contact Name"
              value={form.contact_name}
              onChange={(e) => handleChange('contact_name', e.target.value)}
              disabled={!isEditing}
            />

            <div className="flex items-center gap-3 pb-2 pt-2">
              <User className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Contact</span>
            </div>

            <Input
              label="WhatsApp"
              type="tel"
              value={form.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              disabled={!isEditing}
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!isEditing}
            />

            <div className="flex items-center gap-3 pb-2 pt-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Location</span>
            </div>

            <Input
              label="Villa Name"
              value={form.villa_name}
              onChange={(e) => handleChange('villa_name', e.target.value)}
              disabled={!isEditing}
            />

            <Input
              label="Area"
              value={form.area}
              onChange={(e) => handleChange('area', e.target.value)}
              disabled={!isEditing}
            />

            <div className="flex items-center gap-3 pb-2 pt-2">
              <CreditCard className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Banking</span>
            </div>

            <Input
              label="Bank Account Number"
              value={form.bank_account}
              onChange={(e) => handleChange('bank_account', e.target.value)}
              disabled={!isEditing}
            />

            <Input
              label="Bank Name"
              value={form.bank_name}
              onChange={(e) => handleChange('bank_name', e.target.value)}
              disabled={!isEditing}
            />

            {isEditing && (
              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSave}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </Card>
      </FadeIn>
    </div>
  )
}
