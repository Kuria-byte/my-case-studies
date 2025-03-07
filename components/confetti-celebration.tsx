"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  delay: number
}

export function ConfettiCelebration({ duration = 3000 }) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Generate confetti pieces
    const pieces: ConfettiPiece[] = []
    const colors = [
      "#FFD166", // yellow
      "#06D6A0", // green
      "#118AB2", // blue
      "#EF476F", // pink
      "#ffffff", // white
    ]

    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // random position across screen width (%)
        y: -5 - Math.random() * 10, // start above the viewport
        size: 5 + Math.random() * 10, // random size between 5-15px
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360, // random initial rotation
        delay: Math.random() * 0.5, // random delay for varied animation start
      })
    }

    setConfetti(pieces)

    // Cleanup after animation duration
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size * (Math.random() * 0.5 + 0.5)}px`, // varied aspect ratio
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px", // mix of circles and rectangles
            rotate: `${piece.rotation}deg`,
          }}
          initial={{
            y: `${piece.y}%`,
            x: `${piece.x}%`,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: "120%",
            x: `${piece.x + (Math.random() * 20 - 10)}%`,
            rotate: `${piece.rotation + (Math.random() > 0.5 ? 360 : -360)}deg`,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: piece.delay,
            ease: [0.1, 0.25, 0.3, 1],
          }}
        />
      ))}
    </div>
  )
}

