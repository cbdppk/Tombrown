'use client'
import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { usePathname, useRouter } from 'next/navigation'

export default function Header({ onOpenCart }: { onOpenCart?: () => void }) {
  const [open, setOpen] = useState(false)
  const count = useCart(s => s.items.reduce((n, i) => n + i.qty, 0))
  const openCart = onOpenCart ?? (() => {})
  const pathname = usePathname()
  const router = useRouter()

  const goContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)

    // If we're already on the home page, smooth-scroll.
    if (pathname === '/' || pathname === '') {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    // Otherwise navigate to the home page's #contact.
    router.push('/#contact')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-semibold text-lg tracking-tight">Tom Brown</a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          <a href="/profile" className="text-sm text-neutral-700 hover:text-black">Profile</a>
          <a
            href="/#contact"
            onClick={goContact}
            className="text-sm text-neutral-700 hover:text-black"
          >
            Contact
          </a>

          <button
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm hover:bg-neutral-50"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 h-5 min-w-[20px] px-1 rounded-full bg-black text-white text-[11px] flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="sm:hidden rounded-xl border p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sheet (overlay; doesn’t push page) */}
      {open && (
        <div className="sm:hidden absolute inset-x-0 top-16 z-50 mx-4 rounded-2xl border bg-white shadow-lg">
          <div className="p-3 flex flex-col">
            <a
              href="/profile"
              className="px-3 py-2 rounded-lg hover:bg-neutral-50"
              onClick={() => setOpen(false)}
            >
              Profile
            </a>

            <a
              href="/#contact"
              className="px-3 py-2 rounded-lg hover:bg-neutral-50"
              onClick={goContact}
            >
              Contact
            </a>

            <button
              onClick={() => { setOpen(false); openCart() }}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-neutral-50"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {count > 0 && (
                <span className="ml-auto h-5 min-w-[20px] px-1 rounded-full bg-black text-white text-[11px] flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
