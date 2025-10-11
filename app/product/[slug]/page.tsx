'use client'
import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/types'
import { PRODUCTS as DEFAULTS } from '@/lib/products'
import { SHOP_CONFIG } from '@/lib/shopConfig'
import { money } from '@/lib/currency'

function useCatalog(): Product[] {
  const [items, setItems] = useState<Product[]>(DEFAULTS)
  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('catalog') : null
    if (raw) {
      try { setItems(JSON.parse(raw)) } catch {}
    }
  }, [])
  return items
}

export default function PDP({ params }: { params: { slug: string } }) {
  const catalog = useCatalog()
  const product = useMemo(() => catalog.find(p => p.slug === params.slug), [catalog, params.slug])
  const add = useCart(s => s.add)
  const [qty, setQty] = useState(1)

  if (!product) {
    return <main className="max-w-6xl mx-auto px-4 py-12"><p>Product not found. <Link href="/">Back home</Link></p></main>
  }

  const first = product.variants[0]
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description || '',
    brand: SHOP_CONFIG.displayName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GHS',
      price: first.price,
      availability: 'https://schema.org/InStock',
      url: typeof window !== 'undefined' ? window.location.href : ''
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Script id="ld-json" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square card overflow-hidden">
          <Image src={product.images[0] || 'https://picsum.photos/seed/placeholder/1200/1200'} alt={product.title} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <nav className="text-sm text-neutral-600">
            <Link href="/" className="hover:underline">Home</Link> / <span>{product.title}</span>
          </nav>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-brand text-xl font-semibold">{money(first.price)}</div>
          {product.description ? <p className="text-neutral-700">{product.description}</p> : null}

          <div className="flex items-center gap-3">
            <button className="btn-outline rounded-xl px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span>{qty}</span>
            <button className="btn-outline rounded-xl px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary" onClick={() => add(product, first, qty)}>Add to Cart</button>
            <Link href="/" className="btn btn-outline">Continue shopping</Link>
          </div>
        </div>
      </div>
    </main>
  )
}