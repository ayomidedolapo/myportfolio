export const dynamic = 'force-dynamic'
import { getAdminSubmissions } from '@/lib/admin-data'
import { markSubmissionRead, deleteSubmission } from '@/lib/actions/contact'
import { DeleteButton } from '@/components/admin/delete-button'
import { Mail, MailOpen } from 'lucide-react'

export default async function SubmissionsPage() {
  let submissions: any[] = []
  let error = ''
  try { submissions = await getAdminSubmissions() } catch (e) { error = 'Database not connected' }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
        <p className="text-sm text-muted-foreground">Contact form submissions</p>
      </div>

      {error && <div className="border border-border bg-card p-4 text-sm text-muted-foreground">{error}</div>}

      {submissions.length === 0 && !error ? (
        <div className="border border-border bg-card py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">Not listed yet.</p>
          <p className="mt-1 text-xs text-muted-foreground">Submissions will appear here when someone uses your contact form.</p>
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-10"></th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Subject</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Message</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {submissions.map((s) => (
                <tr key={s.id} className={`transition-colors hover:bg-muted/20 ${!s.read ? 'bg-muted/10' : ''}`}>
                  <td className="px-4 py-3">
                    <form action={markSubmissionRead.bind(null, s.id, !s.read)}>
                      <button type="submit" className="text-muted-foreground hover:text-foreground" title={s.read ? 'Mark unread' : 'Mark read'}>
                        {s.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4 text-primary" />}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.subject || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{s.message}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <DeleteButton id={s.id} action={deleteSubmission} label="submission" />
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