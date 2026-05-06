import { createClient } from '@/lib/supabase/server'
import { BottomNav } from '@/components/ui/bottom-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Auth check is soft in dev — page renders with demo banner if not logged in
  const isDemo = !user

  return (
    <div className="min-h-screen pb-20">
      {isDemo && (
        <div className="bg-warning/20 px-4 py-2 text-center text-xs text-warning">
          🛠️ Demo Mode — Not logged in. Some features require login.
        </div>
      )}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-lg font-medium text-accent">myCHEF</span>
          <span className="text-xs text-text-muted">Admin</span>
        </div>
      </header>
      <main className="p-4">{children}</main>
      <BottomNav variant="admin" />
    </div>
  )
}
