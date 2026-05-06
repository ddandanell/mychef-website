'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ROOT_DOMAIN } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'

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

    const subdomain = role === 'team' ? 'app' : 'partner'
    window.location.href = `http://${subdomain}.${ROOT_DOMAIN}/dashboard`
  }

  async function handleDemo(role: 'team' | 'partner') {
    await fetch('/api/demo', { method: 'POST' })
    const subdomain = role === 'team' ? 'app' : 'partner'
    window.location.href = `http://${subdomain}.${ROOT_DOMAIN}/dashboard`
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <FadeIn>
          <div className="text-center">
            <h1 className="text-3xl font-medium tracking-tight text-accent">myCHEF</h1>
            <p className="mt-2 text-text-muted">Premium Private Dining</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-text-muted">or try demo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                onClick={() => handleDemo('team')}
                className="w-full"
              >
                🛠️ Demo Admin
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleDemo('partner')}
                className="w-full"
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
