import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { auth } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { TopLoader } from '@/components/admin/top-loader'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Suspense fallback={null}>
        <TopLoader />
      </Suspense>
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b px-6">
          <h1 className="text-sm font-medium text-muted-foreground">Admin Dashboard</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}