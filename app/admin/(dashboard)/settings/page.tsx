export const dynamic = 'force-dynamic'
import { getSiteSettings } from '@/lib/data'
import { SettingsForm } from '@/components/admin/settings-form'

export default async function SettingsPage() {
  const settings = await getSiteSettings()
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Site identity, contact, and SEO defaults</p>
      </div>
      <SettingsForm initialData={settings} />
    </div>
  )
}