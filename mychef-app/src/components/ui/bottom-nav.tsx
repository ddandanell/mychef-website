'use client'

import { cn } from '@/lib/utils'
import { Home, Users, CalendarDays, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const adminTabs = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/leads', label: 'People', icon: Users },
  { href: '/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/settings', label: 'Settings', icon: Settings },
]

const partnerTabs = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/request', label: 'Request', icon: CalendarDays },
  { href: '/certificate', label: 'Certificate', icon: Settings },
  { href: '/profile', label: 'Profile', icon: Users },
]

interface BottomNavProps {
  variant?: 'admin' | 'partner'
}

export function BottomNav({ variant = 'admin' }: BottomNavProps) {
  const pathname = usePathname()
  const tabs = variant === 'admin' ? adminTabs : partnerTabs

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-lg justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-3 py-2 transition-colors',
                isActive ? 'text-accent' : 'text-text-muted hover:text-text-primary'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
