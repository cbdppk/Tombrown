'use client'
import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function FloatingCartButton({
  onOpenCart,
}: {
  onOpenCart: () => void
}) {
  // total items in cart
  const count = useCart(s => s.items.reduce((n, i) => n + i.qty, 0))

  // tiny pop animation when the number changes
  const [pop, setPop] = useState(false)
  useEffect(() => {
    setPop(true)
    const t = setTimeout(() => setPop(false), 200)
    return () => clearTimeout(t)
  }, [count])

  return (
    <button
      onClick={onOpenCart}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-neutral-900 text-white px-5 py-3 shadow-xl hover:bg-neutral-800 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 transition"
      aria-label="Open cart"
    >
      <span className="relative inline-flex items-center">
        <ShoppingCart className="h-5 w-5" />
        {/* High-contrast count badge */}
        <span
          className={[
            'absolute -right-2 -top-2 h-5 min-w-[20px] px-1 rounded-full',
            'bg-amber-400 text-black text-[11px] flex items-center justify-center',
            pop ? 'scale-110' : 'scale-100',
            'transition-transform motion-reduce:transition-none',
          ].join(' ')}
        >
          {count}
        </span>
      </span>
      <span className="ml-2 text-sm font-medium">Cart</span>
    </button>
  )
}
