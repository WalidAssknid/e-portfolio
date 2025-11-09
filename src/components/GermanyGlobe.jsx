"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import { useMotionValue, useSpring } from "motion/react"
import { twMerge } from "tailwind-merge"

const MOVEMENT_DAMPING = 1400

// Germany coordinates (Berlin): 52.52° N, 13.405° E
const GERMANY_GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25, // Adjust to show Europe/Germany
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.2, 0.2, 0.3],
  markerColor: [0.33, 0.76, 0.8], // Aqua color for marker
  glowColor: [0.33, 0.76, 0.8],
  markers: [
    { location: [52.52, 13.405], size: 0.15 }, // Berlin, Germany - larger marker
  ],
}

export function GermanyGlobe({ className }) {
  let phi = 0
  const widthRef = useRef(0)
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const globeRef = useRef(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth || 400
      }
    }

    window.addEventListener("resize", onResize)
    
    // Use requestAnimationFrame to ensure canvas is laid out
    requestAnimationFrame(() => {
      onResize()

      // Ensure we have a valid width
      if (widthRef.current === 0) {
        widthRef.current = canvasRef.current.offsetWidth || 400
      }

      if (canvasRef.current) {
        globeRef.current = createGlobe(canvasRef.current, {
          ...GERMANY_GLOBE_CONFIG,
          width: widthRef.current * 2,
          height: widthRef.current * 2,
          onRender: (state) => {
            if (!pointerInteracting.current) phi += 0.003 // Slower rotation
            state.phi = phi + rs.get()
            state.width = widthRef.current * 2
            state.height = widthRef.current * 2
          },
        })

        setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.style.opacity = "1"
          }
        }, 0)
      }
    })

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy()
      }
      window.removeEventListener("resize", onResize)
    }
  }, [rs])

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[500px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[25rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}

