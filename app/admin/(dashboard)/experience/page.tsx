import Link from 'next/link'
import { getAdminExperiences } from '@/lib/admin-data'
import { deleteExperience } from '@/lib/actions/profile'
import { DeleteButton } from '@/components/admin/delete-button'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'

export default async function ExperiencePage() {
  let items: any[] = []
  let error = ''
  try { items = await getAdminExperiences() } catch { error = 'Database not connected' }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
          <p className="text-sm text-muted-foreground">Manage your work history</p>
        </div>
        <Link href="/admin/experience/new">
          <Button size="sm" className="gap-2 rounded-none"><Plus className="h-4 w-4" /> Add Experience</Button>
        </Link>
      </div>

      {error && <div className="border border-border bg-card p-4 text-sm text-muted-foreground">{error}</div>}

      {items.length === 0 && !error ? (
        <div className="border border-border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">Not listed yet.</p>
        </div>
      ) : (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Period</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((e) => (
                <tr key={e.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{e.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(e.startDate).getFullYear()} — {e.isCurrent ? 'Present' : new Date(e.endDate).getFullYear()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/experience/${e.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton id={e.id} action={deleteExperience} label="experience" />
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