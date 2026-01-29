'use client'

import { useEffect, useRef } from 'react'

// Vanta types
interface VantaEffect {
  destroy: () => void
}

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<VantaEffect | null>(null)

  useEffect(() => {
    if (!vantaRef.current) return

    // Load THREE.js first, then Vanta
    const loadVanta = async () => {
      // Load THREE.js
      if (!window.THREE) {
        const THREE = await import('three')
        window.THREE = THREE
      }

      // Load Vanta NET effect
      if (!window.VANTA) {
        await import('vanta/dist/vanta.net.min.js')
      }

      // Initialize Vanta effect
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x06b6d4, // cyan-500
        backgroundColor: 0x000000, // black
        points: 10.00,
        maxDistance: 25.00,
        spacing: 18.00,
        showDots: true
      })
    }

    loadVanta()

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [])

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 w-full h-full z-100"
    />
  )
}
