import type { Product } from './types'

export const PRODUCTS: Product[] = [
  {
    id: 'tb-1',
    slug: 'tom-brown-cereal',
    title: 'Tom Brown Cereal',
    // Use your local image (served from /public)
    images: ['/images/product.jpg'],
    description:
      'Roasted maize & peanut cereal. Carefully selected grains, hygienically processed, and sealed for freshness.',
    variants: [
      { label: '500g', price: 50 },
      { label: '1kg', price: 45 },
      { label: '2kg', price: 80 },
    ],
    badges: ['Fresh', 'Rich & Smooth'],
  },
]
