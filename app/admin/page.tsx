'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Product } from '@/lib/types'
import { PRODUCTS as DEFAULTS } from '@/lib/products'

export default function Admin() {
  const [preview, setPreview] = useState<Product[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => setPreview(DEFAULTS), [])

  const downloadTemplate = () => {
    const tpl: Product[] = DEFAULTS
    const blob = new Blob([JSON.stringify(tpl, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'catalog.template.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onFile = async (file?: File) => {
    if (!file) return
    const text = await file.text()
    try {
      const json = JSON.parse(text)
      if (!Array.isArray(json)) throw new Error('Expected an array of products')
      localStorage.setItem('catalog', JSON.stringify(json))
      setPreview(json)
      alert('Catalog saved. Refresh home to see changes.')
    } catch (e:any) {
      alert('Invalid JSON: ' + e.message)
    }
  }

  const clear = () => {
    localStorage.removeItem('catalog')
    setPreview(DEFAULTS)
    alert('Catalog cleared.')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shop Admin</h1>
          <a href="/" className="text-sm text-neutral-600 hover:underline">← Back to shop</a>
        </div>

        {/* Card: Upload Catalog */}
        <div className="card p-6 mb-8">
          <h2 className="font-semibold">Update Prices & Sizes</h2>
          <p className="mt-1 text-sm text-neutral-600">Upload a <code>.json</code> catalog. You can start from our template.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input ref={fileRef} type="file" accept="application/json" onChange={e => onFile(e.target.files?.[0] || undefined)} className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm" />
            <button onClick={downloadTemplate} className="btn btn-outline">Download template</button>
            <button onClick={clear} className="btn btn-outline">Clear override</button>
          </div>
          <p className="mt-3 text-xs text-neutral-500">Tip: This is a demo admin that saves to your browser only. For multi-user editing, we can plug in a headless CMS later.</p>
        </div>

        {/* Preview Grid */}
        <div>
          <h3 className="mb-3 font-semibold">Preview</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map(p => (
              <div key={p.id} className="card overflow-hidden">
                <div className="relative aspect-square bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images?.[0] || 'https://picsum.photos/seed/placeholder/1200/1200'} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.variants?.map(v => (
                      <span key={v.label} className="badge">{v.label}: GHS {v.price}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}