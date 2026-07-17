import { getAdminServices } from '@/lib/admin-data'
import { deleteService } from '@/lib/actions/profile'
import { DeleteButton } from '@/components/admin/delete-button'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'

interface Service {
  id: string
  title: string
  priceInfo: string | null
  isActive: boolean
}

export default async function ServicesPage() {
  let items: Service[] = []
  let error = ''
  try { items = await getAdminServices() } catch { error = 'Database not connected' }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
          <p className="text-sm text-muted-foreground">Manage service offerings</p>
        </div>
        <Link href="/admin/services/new">
          <Button size="sm" className="gap-2 rounded-none"><Plus className="h-4 w-4" /> Add Service</Button>
        </Link>
      </div>

      {error && <div className="border border-border bg-card p-4 text-sm text-muted-foreground">{error}</div>}

      {items.length === 0 && !error ? (
        <div className="border border-border bg-card py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">Not listed yet.</p>
        </div>
      ) : (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Active</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.priceInfo || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/services/${item.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton id={item.id} action={deleteService} label="service" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}