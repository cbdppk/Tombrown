'use client'
import { useMemo } from 'react'
import { X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { money } from '@/lib/currency'
import { buildWALink } from '@/lib/wa'

export default function CartModal({
  open,
  onClose,
  phone,
  storeName,
}: {
  open: boolean
  onClose: () => void
  phone: string
  storeName: string
}) {
  const items = useCart(s => s.items)
  const remove = useCart(s => s.remove)
  const setQty = useCart(s => s.setQty)

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.variant.price * i.qty, 0),
    [items]
  )

  const wa = buildWALink(phone, storeName, items)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* panel (slides from left) */}
      <aside className="absolute left-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="rounded-lg p-2 hover:bg-neutral-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-neutral-600">Your cart is empty.</p>
          )}

          {items.map(i => (
            <div
              key={i.productId + i.variant.label}
              className="flex items-center justify-between gap-3 border-b pb-3"
            >
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-xs text-neutral-600">{i.variant.label}</div>

                <div className="mt-1 inline-flex items-center rounded-xl border">
                  <button
                    className="px-2 py-1"
                    onClick={() =>
                      setQty(i.productId, i.variant.label, Math.max(1, i.qty - 1))
                    }
                  >
                    −
                  </button>
                  <span className="px-3">{i.qty}</span>
                  <button
                    className="px-2 py-1"
                    onClick={() => setQty(i.productId, i.variant.label, i.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold">{money(i.variant.price * i.qty)}</div>
                <button
                  className="text-xs text-red-600 hover:underline"
                  onClick={() => remove(i.productId, i.variant.label)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Subtotal</span>
            <span className="font-semibold">{money(total)}</span>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-center"
          >
            Checkout via WhatsApp
          </a>
        </div>
      </aside>
    </div>
  )
}
