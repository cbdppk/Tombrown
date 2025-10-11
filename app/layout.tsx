import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Tom Brown Shop Name',
  description: 'WhatsApp checkout shop built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface">{children}</body>
    </html>
  )
}