import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { Users, Building2, ClipboardList, Banknote, Truck, MessageSquare, Settings2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

const settingsSections = [
  { href: '/settings/team', label: 'Team Members', icon: Users, desc: 'Manage staff and roles' },
  { href: '/settings/partner-mgmt', label: 'Partners', icon: Building2, desc: 'Villa partners directory' },
  { href: '/settings/menus', label: 'Menus & Pricing', icon: ClipboardList, desc: 'Menu items and pricing' },
  { href: '/settings/products', label: 'Products', icon: ClipboardList, desc: 'Food, drinks, rentals' },
  { href: '/settings/suppliers', label: 'Suppliers', icon: Truck, desc: 'Supplier management' },
  { href: '/settings/financial', label: 'Financial', icon: Banknote, desc: 'Costs, commissions, payouts' },
  { href: '/settings/whatsapp', label: 'WhatsApp Templates', icon: MessageSquare, desc: 'Message templates' },
  { href: '/settings/app', label: 'App Settings', icon: Settings2, desc: 'General configuration' },
]

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .single() as any

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin'

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">Settings</h1>
      </FadeIn>

      <StaggerContainer className="grid gap-2">
        {settingsSections.map((section) => (
          <StaggerItem key={section.href}>
            <Link href={section.href}>
              <Card className="flex items-center gap-4 p-4 transition-colors hover:bg-surface/80">
                <section.icon className="h-5 w-5 text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{section.label}</p>
                  <p className="text-xs text-text-muted">{section.desc}</p>
                </div>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {!isAdmin && (
        <FadeIn delay={0.2}>
          <p className="text-center text-xs text-text-muted">
            Some settings require admin access
          </p>
        </FadeIn>
      )}
    </div>
  )
}
