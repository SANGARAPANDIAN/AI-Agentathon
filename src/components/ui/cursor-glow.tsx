'use client'

import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Disable on mobile or reduced motion
    if (shouldReduceMotion || window.innerWidth < 768) return

    // Apply custom cursor globally
    const style = document.createElement('style')
    style.innerHTML = `
      * {
        cursor: url('/cursor.png') 12 0, auto !important;
      }
      a, button, [role="button"], input, textarea, select, [onclick] {
        cursor: url('/cursor.png') 12 0, pointer !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (style.parentNode) {
        document.head.removeChild(style)
      }
    }
  }, [shouldReduceMotion])

  return null
}

