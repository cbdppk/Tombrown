'use client'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useUI } from '@/lib/ui'

export default function FloatingCartButton() {
  const count = useCart(s => s.items.reduce((n, i) => n + i.qty, 0))
  const open = useUI(s => s.openCart)

  return (
    <button
      onClick={open}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-neutral-900 p-4 text-white shadow-xl active:scale-[.98]"
      aria-label="Open cart"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full bg-brand px-2 py-[2px] text-[10px] font-semibold text-white">
            {count}
          </span>
        )}
      </div>
    </button>
  )
}
