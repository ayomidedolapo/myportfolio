import { getAdminMedia } from '@/lib/admin-data'
import { deleteMediaAsset } from '@/lib/actions/media'
import { DeleteButton } from '@/components/admin/delete-button'
import { ImageIcon, Video } from 'lucide-react'

export default async function MediaPage() {
  let assets: any[] = []
  let error = ''
  try { assets = await getAdminMedia() } catch (e) { error = 'Database not connected' }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
        <p className="text-sm text-muted-foreground">Cloudinary assets</p>
      </div>

      {error && <div className="border border-border bg-card p-4 text-sm text-muted-foreground">{error}</div>}

      {assets.length === 0 && !error ? (
        <div className="border border-border bg-card py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">Not listed yet.</p>
          <p className="mt-1 text-xs text-muted-foreground">Upload images via the project/blog forms. They will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 lg:grid-cols-6">
          {assets.map((a) => (
            <div key={a.id} className="group relative bg-card p-3">
              <div className="relative aspect-square bg-muted">
                {a.type === 'image' ? (
                  <img src={a.url} alt={a.publicId} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">{a.format || a.type}</span>
                <DeleteButton id={a.id} action={deleteMediaAsset} label="asset" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}