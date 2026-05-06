import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import {
  Award,
  MapPin,
  BarChart3,
  CalendarCheck,
  BookOpen,
  Tv,
  ShieldCheck,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Official Certification',
    desc: 'Receive an exclusive myCHEF Certified Partner badge for your villa. Display it proudly — your guests will know they\'re getting a world-class dining experience.',
  },
  {
    icon: MapPin,
    title: 'Featured on Our Map',
    desc: 'Your villa appears on our curated partner directory. Guests browsing myCHEF will discover your property and book directly through your profile.',
  },
  {
    icon: BarChart3,
    title: 'Transparent Earnings',
    desc: 'Real-time dashboard showing every booking, commission, and payout. No hidden fees. No surprises. Complete financial transparency.',
  },
  {
    icon: CalendarCheck,
    title: 'Direct Booking System',
    desc: 'Your own partner portal to request bookings, track events, and manage your calendar. One-click requests — we handle the rest.',
  },
  {
    icon: BookOpen,
    title: 'Complete Menu Library',
    desc: 'Access to all our menus, wine pairings, and dietary options. Present them to your guests with confidence.',
  },
  {
    icon: Tv,
    title: 'Marketing Kit & TV Displays',
    desc: 'Digital menus, promotional videos, and in-villa TV content — all branded with your villa\'s logo. Ready to impress from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'White-Label Materials',
    desc: 'Every asset we provide carries your brand. Your logo, your colors, your identity. We empower you to sell under your own name.',
  },
  {
    icon: Sparkles,
    title: 'The Complete Package',
    desc: 'From first inquiry to final cleanup, we handle everything. You simply offer the space — we deliver an unforgettable evening.',
  },
]

const included = [
  'Official myCHEF Certification',
  'Partner portal with earnings tracking',
  'Direct booking system',
  'Full menu & wine library',
  'Marketing materials (digital + print)',
  'In-villa TV display content',
  'White-label branded assets',
  'Dedicated partner support',
  'Commission on every booking',
  'Transparent pricing — no hidden costs',
]

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-lg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C9A96E15_0%,_transparent_70%)]" />
        <FadeIn>
          <Badge variant="hot" className="mb-4">Exclusive Partnership</Badge>
          <h1 className="relative z-10 text-3xl font-medium leading-tight tracking-tight text-accent">
            Elevate Your Villa
          </h1>
          <p className="relative z-10 mx-auto mt-4 max-w-sm text-lg text-text-muted">
            Join Bali&apos;s most curated private dining network
          </p>
          <p className="relative z-10 mx-auto mt-2 max-w-xs text-sm text-text-muted">
            We partner with only the finest villas. Every application is reviewed by our team.
          </p>
        </FadeIn>
      </section>

      {/* Benefits Grid */}
      <section className="px-4 py-6">
        <FadeIn>
          <h2 className="mb-1 text-center text-lg font-medium">What You Receive</h2>
          <p className="mb-6 text-center text-sm text-text-muted">
            A complete package to make your villa unforgettable
          </p>
        </FadeIn>
        <StaggerContainer className="space-y-3">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <Card className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <b.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{b.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{b.desc}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* What's Included List */}
      <section className="px-4 py-6">
        <FadeIn>
          <Card className="p-5">
            <h2 className="mb-4 text-center text-lg font-medium text-accent">
              Everything Included
            </h2>
            <div className="space-y-3">
              {included.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  <span className="text-sm text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-6">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-3 text-sm text-text-muted">
              &ldquo;Since partnering with myCHEF, our villa bookings have increased by 40%. Guests specifically ask for the dining experience.&rdquo;
            </p>
            <p className="mt-2 text-xs text-text-muted">
              — Villa Kelapa, Canggu
            </p>
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="px-4 py-10">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-xl font-medium text-accent">Ready to Join?</h2>
            <p className="mt-2 text-sm text-text-muted">
              Apply now. Our team reviews every application personally.
            </p>
            <Link href="/join/apply">
              <Button className="mt-6 w-full">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
