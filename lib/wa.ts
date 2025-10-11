import { CartItem } from './cart'

export const buildWALink = (
  phone: string,
  storeName: string,
  items: CartItem[],
  extra?: { name?: string; phone?: string; area?: string; time?: string; note?: string }
) => {
  const lines = [
    `Order Request — ${storeName}`,
    '',
    'Items:',
    ...items.map(i => `- ${i.title} (${i.variant.label}) × ${i.qty} = ${i.variant.price * i.qty}`),
  ]
  if (extra?.name) lines.push('', `Name: ${extra.name}`)
  if (extra?.phone) lines.push(`Customer Phone: ${extra.phone}`)
  if (extra?.area) lines.push(`Delivery Area: ${extra.area}`)
  if (extra?.time) lines.push(`Preferred Time: ${extra.time}`)
  if (extra?.note) lines.push(`Note: ${extra.note}`)
  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${phone}?text=${text}`
}