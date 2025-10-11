import { create } from 'zustand'
import type { Product, Variant } from './types'

export type CartItem = {
  productId: string
  title: string
  variant: Variant
  qty: number
}

type State = {
  items: CartItem[]
  add: (p: Product, v: Variant, qty?: number) => void
  remove: (productId: string, variantLabel: string) => void
  setQty: (productId: string, variantLabel: string, qty: number) => void
  clear: () => void
}

export const useCart = create<State>((set) => ({
  items: [],
  add: (p, v, qty = 1) => set((s) => {
    const key = `${p.id}|${v.label}`
    const found = s.items.find(i => `${i.productId}|${i.variant.label}` === key)
    if (found) {
      return { items: s.items.map(i => i === found ? { ...i, qty: i.qty + qty } : i) }
    }
    return { items: [...s.items, { productId: p.id, title: p.title, variant: v, qty }] }
  }),
  remove: (pid, vlabel) => set((s) => ({ items: s.items.filter(i => !(i.productId === pid && i.variant.label === vlabel)) })),
  setQty: (pid, vlabel, qty) => set((s) => ({ items: s.items.map(i => i.productId === pid && i.variant.label === vlabel ? { ...i, qty } : i) })),
  clear: () => set({ items: [] }),
}))