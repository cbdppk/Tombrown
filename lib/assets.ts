// Simple cache-busting helper for local assets.
// Bump NEXT_PUBLIC_ASSET_TAG (e.g. 1 → 2) when you replace images with the same filename.
export const ASSET_TAG = process.env.NEXT_PUBLIC_ASSET_TAG || '1'
export const v = (p: string) => `${p}?v=${ASSET_TAG}`
