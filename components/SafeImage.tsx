'use client'
import { useState, useMemo } from 'react'

type Props = {
  srcs: (string | undefined)[]
  alt: string
  className?: string
}

/** Tries each src in order; onError advances to the next one. */
export default function SafeImage({ srcs, alt, className }: Props) {
  const list = useMemo(
    () => Array.from(new Set(srcs.filter((s): s is string => !!s && s.trim().length > 0))),
    [srcs]
  )
  const [idx, setIdx] = useState(0)
  if (!list.length) return null

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={list[idx]!}
      alt={alt}
      className={className}
      onError={() => {
        if (idx < list.length - 1) setIdx(idx + 1)
      }}
    />
  )
}
