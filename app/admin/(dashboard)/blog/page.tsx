export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { getAdminPosts } from '@/lib/admin-data'
import { deleteBlogPost } from '@/lib/actions/blog'
import { DeleteButton } from '@/components/admin/delete-button'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'

export default async function AdminBlogPage() {
  let posts: any[] = []
  let error = ''
  try { posts = await getAdminPosts() } catch (e) { error = 'Database not connected' }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
          <p className="text-sm text-muted-foreground">Manage articles and insights</p>
        </div>
        <Link href="/admin/blog/new">
          <Button size="sm" className="gap-2 rounded-none"><Plus className="h-4 w-4" /> Write Post</Button>
        </Link>
      </div>

      {error && <div className="border border-border bg-card p-4 text-sm text-muted-foreground">{error}</div>}

      {posts.length === 0 && !error ? (
        <div className="border border-border bg-card py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">Not listed yet.</p>
          <p className="mt-1 text-xs text-muted-foreground">Write your first post to see it here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category?.name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${p.status === 'published' ? 'bg-foreground text-background' : 'border border-border text-muted-foreground'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blog/${p.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton id={p.id} action={deleteBlogPost} label="post" />s
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