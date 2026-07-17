'use client'

import { useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default')

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )

      const data = await res.json()
      if (data.secure_url) {
        onChange(data.secure_url)
      } else {
        setError('Upload failed. Check Cloudinary preset.')
      }
    } catch (e) {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {value ? (
        <div className="relative aspect-video w-full max-w-md border border-border bg-muted">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center border border-border bg-background/90 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex aspect-video w-full max-w-md cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-muted/30 transition-colors hover:bg-muted">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="mt-2 text-xs text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="mt-2 text-xs text-muted-foreground">Click to upload</span>
            </>
          )}
        </label>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
      <p className="text-xs text-muted-foreground">Or paste URL directly:</p>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="flex h-10 w-full max-w-md border border-border bg-muted/30 px-3 py-2 text-sm"
      />
    </div>
  )
}