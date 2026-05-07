'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleLogin(role: 'team' | 'partner') {
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    // Determine redirect based on actual user role from database
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    let userRole: string | null = null
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()
      userRole = (profile as { role?: string } | null)?.role ?? null
    }

    if (userRole === 'partner') {
      window.location.href = '/p/dashboard'
    } else if (userRole === 'admin' || userRole === 'super_admin' || userRole === 'team') {
      window.location.href = '/dashboard'
    } else {
      // Fallback to button selection if role not found
      window.location.href = role === 'team' ? '/dashboard' : '/p/dashboard'
    }
  }

  async function handleDemo(role: 'team' | 'partner') {
    await fetch('/api/demo', { method: 'POST' })
    window.location.href = role === 'team' ? '/dashboard' : '/p/dashboard'
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/login-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-8">
        <FadeIn>
          <div className="text-center">
            <h1 className="text-3xl font-medium tracking-tight text-accent">myCHEF</h1>
            <p className="mt-2 text-white/70">Premium Private Dining</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-4 rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
            />

            {error && <p className="text-sm text-error">{error}</p>}

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleLogin('team')}
                isLoading={loading}
                className="w-full"
              >
                Sign in as Team
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleLogin('partner')}
                isLoading={loading}
                className="w-full"
              >
                Sign in as Partner
              </Button>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-transparent px-2 text-white/50">or try demo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                onClick={() => handleDemo('team')}
                className="w-full border border-white/10 text-white hover:bg-white/10"
              >
                🛠️ Demo Admin
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleDemo('partner')}
                className="w-full border border-white/10 text-white hover:bg-white/10"
              >
                🛠️ Demo Partner
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
