'use client'
import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartModal from '@/components/CartModal'
import ProductCard from '@/components/ProductCard'
import SafeImage from '@/components/SafeImage'
import FloatingCartButton from '@/components/FloatingCartButton'
import { PRODUCTS as DEFAULTS } from '@/lib/products'
import { SHOP_CONFIG } from '@/lib/shopConfig'
import type { Product } from '@/lib/types'
import { v } from '@/lib/assets'

export default function Page() {
  const [products, setProducts] = useState<Product[]>(DEFAULTS)
  const cfg = SHOP_CONFIG
  const p = useMemo(() => products[0], [products])

  // hydrate products from local override if present
  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('catalog') : null
    if (raw) { try { setProducts(JSON.parse(raw)) } catch {} }
  }, [])

  // Cart modal
  const [cartOpen, setCartOpen] = useState(false)

  // Contact form state + WA validation
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('')
  const [msg, setMsg] = useState('')
  const valid = name.trim() && phone.trim() && area.trim() && msg.trim()
  const handleContact = () => {
    if (!valid) { alert('Please fill in your name, phone, area and message.'); return }
    const text = encodeURIComponent([
      `Contact — ${cfg.displayName}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Area: ${area}`,
      `Message: ${msg}`,
    ].join('\n'))
    window.open(`https://wa.me/${cfg.phone}?text=${text}`, '_blank')
  }

  const heroPrimary = (p?.images?.[0] && (/^https?:\/\//.test(p.images[0]) || p.images[0].startsWith('/'))) ? p.images[0] : undefined

  // ensure hash #contact scrolls after navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      const t = setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <main className="min-h-screen bg-surface scroll-smooth">
      <Header onOpenCart={() => setCartOpen(true)} />

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[74vh] min-h-[520px] md:h-[90vh] w-full overflow-hidden">
          <SafeImage
            alt="Tom Brown hero"
            className="absolute inset-0 h-full w-full object-cover z-0"
            srcs={[
              v('/images/hero.jpg'),   // ← prefer your local hero (cache-busted)
              heroPrimary,             // then product-provided (if valid)
              v('/images/hero.png'),
              v('/images/hero.webp'),
              '/hero.jpg',
            ]}
          />
          <div className="absolute inset-0 z-10 bg-black/55" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="relative z-20 flex h-full items-center justify-center text-center px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20">
                Genuine • Nutritious • Daily goodness
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white leading-tight">
                Pure, Nutritious Tom&nbsp;Brown
              </h1>
              <p className="mt-2 text-white/90">
                Roasted maize & peanuts — clean, fresh, and wholesome for a healthy diet.
              </p>
              <a href="#product" className="btn btn-primary mt-5 inline-block">See product</a>
            </div>
          </div>

          {/* chips inside hero */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20">
            <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row">
              <div className="flex-1 rounded-2xl bg-white/95 px-4 py-3 text-sm shadow-soft ring-1 ring-black/5">✅ Hygienic small-batch roasting</div>
              <div className="flex-1 rounded-2xl bg-white/95 px-4 py-3 text-sm shadow-soft ring-1 ring-black/5">🌾 Natural grains, rich &amp; satisfying</div>
              <div className="flex-1 rounded-2xl bg-white/95 px-4 py-3 text-sm shadow-soft ring-1 ring-black/5">📦 Freshly packed daily in Accra</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14">
        <div className="flex justify-center">{p && <ProductCard p={p} />}</div>
      </section>

      {/* HOW TO PREPARE */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16 pb-20 md:pb-28">
        <h3 className="text-xl font-semibold mb-4">How to prepare</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5">
            <div className="badge mb-2">Step 1</div>
            <p className="text-sm text-neutral-700">
              Add <strong>4–5 heaped tbsp</strong> Tom Brown per serving. Stir with <strong>60–80&nbsp;ml</strong> cool water into a smooth paste.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5">
            <div className="badge mb-2">Step 2</div>
            <p className="text-sm text-neutral-700">
              Pour the paste into <strong>250–300&nbsp;ml</strong> boiling water, stirring continuously. Simmer <strong>3–4&nbsp;minutes</strong>.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5">
            <div className="badge mb-2">Step 3</div>
            <p className="text-sm text-neutral-700">
              Sweeten to taste (optional: evaporated milk / groundnut paste / honey). Serve hot.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-28 mx-auto max-w-6xl px-4 pt-12 md:pt-16 pb-24 md:pb-32">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
            <h3 className="text-xl font-semibold">Get in touch</h3>
            <p className="mt-1 text-sm text-neutral-600">Fill the form — we’ll reply on WhatsApp.</p>
            <div className="mt-4 space-y-3">
              <label className="block text-xs text-neutral-600">Your name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Ama" className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm" />
              <label className="block text-xs text-neutral-600">Phone</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="e.g. 024..." className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm" />
              <label className="block text-xs text-neutral-600">Area / Location</label>
              <input value={area} onChange={e=>setArea(e.target.value)} placeholder="e.g. Dansoman" className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm" />
              <label className="block text-xs text-neutral-600">Message</label>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Tell us what you need..." className="h-28 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm" />
              <button onClick={handleContact} className="btn btn-primary w-full">Message on WhatsApp</button>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
            <h3 className="text-xl font-semibold">Find us</h3>
            <p className="text-sm text-neutral-700 mt-1">Accra, Ghana · Freshly packed daily.</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700">
              <li>WhatsApp: +{cfg.phone}</li>
              <li>Bulk orders: free delivery (T&amp;Cs)</li>
              <li>Pickup by request</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating cart with live count (opens right-slide cart) */}
      <FloatingCartButton />

      {/* Right-slide Cart modal */}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} phone={cfg.phone} storeName={cfg.displayName} />
    </main>
  )
}
