'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

const ALL_INGREDIENTS = [
  'Red beans','Soya beans','Bambara beans','White beans','Groundnut',
  'Maize','Wheat','Rice','Millet','Nsesaawa','Tiggernut'
]

export default function ProfilePage() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-surface">
      <Header />

      {/* Hero band */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <button onClick={() => router.push('/')} className="btn btn-outline mb-6">← Back to shop</button>
          <div className="rounded-3xl bg-gradient-to-r from-brand/10 to-transparent p-8 ring-1 ring-black/5">
            <h1 className="text-3xl md:text-4xl font-bold">About Our Tom Brown</h1>
            <p className="mt-2 max-w-2xl text-neutral-700">
              Crafted from carefully selected grains and premium peanuts, roasted and milled under hygienic conditions
              for a smooth, creamy cereal that supports a healthy diet.
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients block with real spacing */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-soft ring-1 ring-black/5">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <p className="mt-1 text-sm text-neutral-600">A balanced multi-grain blend for taste and nutrition.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ALL_INGREDIENTS.map(x => (
              <span key={x} className="badge">{x}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Two-column info with proper gaps */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 md:p-8 shadow-soft ring-1 ring-black/5">
            <h3 className="text-lg font-semibold mb-2">Process</h3>
            <p className="text-neutral-700">
              Small-batch roasting for consistent flavor, precise milling for a smooth texture, and immediate sealing
              to lock in aroma and freshness.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8 shadow-soft ring-1 ring-black/5">
            <h3 className="text-lg font-semibold mb-2">Why It’s Great</h3>
            <p className="text-neutral-700">
              Rich flavor, reliable quality, and wholesome nutrients make our Tom Brown a daily favorite for families.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
