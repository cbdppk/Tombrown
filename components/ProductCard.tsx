'use client'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'
import { money } from '@/lib/currency'
import SafeImage from '@/components/SafeImage'
import { v } from '@/lib/assets'

const CARD_INGREDIENTS = ['Red beans', 'Soya beans', 'Groundnut', 'Maize']

const asPath = (s?: string) =>
  s && (/^https?:\/\//.test(s) || s.startsWith('/')) ? s : undefined

export default function ProductCard({ p }: { p: Product }) {
  const add = useCart(s => s.add)
  const first = p.variants[0]

  const toContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5">
      <div className="relative aspect-video sm:aspect-[4/3]">
        <SafeImage
          alt={p.title}
          className="absolute inset-0 h-full w-full object-cover"
          srcs={[
            v('/images/product.jpg'),   // ← prefer local, cache-busted
            asPath(p?.images?.[0]),     // fallback to product-provided if valid
            v('/images/product.png'),
            v('/images/product.webp'),
            '/product.jpg',             // last-chance
          ]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <h3 className="text-white text-xl sm:text-2xl font-semibold drop-shadow-sm">{p.title}</h3>
          <span className="rounded-xl bg-neutral-900/70 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
            {money(first.price)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-neutral-700">
          {p.description || 'Nutritious roasted cereal — smooth, rich, and satisfying.'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CARD_INGREDIENTS.map(ch => <span key={ch} className="badge">{ch}</span>)}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button onClick={() => add(p, first, 1)} className="btn btn-primary w-full">
            Add to cart
          </button>
          <a href="#contact" onClick={toContact} className="btn btn-outline w-full text-center">
            Ask a question
          </a>
        </div>
      </div>
    </article>
  )
}
