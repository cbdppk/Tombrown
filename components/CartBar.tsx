'use client'
import { useMemo } from 'react'
import { useCart } from '@/lib/cart'
import { money } from '@/lib/currency'
import { buildWALink } from '@/lib/wa'

export default function CartBar({ phone, storeName }: { phone: string; storeName: string }) {
  const items = useCart(s => s.items)
  const clear = useCart(s => s.clear)
  const total = useMemo(() => items.reduce((n, i) => n + i.variant.price * i.qty, 0), [items])

  if (!items.length) return null

  const wa = buildWALink(phone, storeName, items)

  return (
    <div className="cartbar" role="region" aria-label="Sticky cart bar">
      <div className="flex items-center gap-3">
        <div className="text-sm">{items.length} item(s)</div>
        <div className="font-semibold">{money(total)}</div>
      </div>
      <div className="flex items-center gap-2">
        <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
          Checkout via WhatsApp
        </a>
        <button className="btn btn-outline" onClick={clear}>Clear</button>
      </div>
    </div>
  )
}
