"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface DesignInspirationCardProps {
  title: string
  description: string
  color: string
  icon: ReactNode
}

export function DesignInspirationCard({ title, description, color, icon }: DesignInspirationCardProps) {
  const { theme } = useTheme()
  const [isActive, setIsActive] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setIsActive(true)
    setClickCount((prev) => prev + 1)

    // Reset active state after animation completes
    setTimeout(() => {
      setIsActive(false)
    }, 1500)
  }

  // Update renderMicroInteraction method to include blur effect for Accessibility First
  const renderMicroInteraction = () => {
    if (!isActive) return null

    if (title === "Microinteractions") {
      return (
        <AnimatePresence>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`star-${i}-${clickCount}`}
              className="absolute w-2 h-2 rounded-full bg-white"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1 + Math.random() }}
            />
          ))}
        </AnimatePresence>
      )
    } else if (title === "Accessibility First") {
      return (
        <AnimatePresence>
          <motion.div
            key={`access-${clickCount}`}
            className="absolute inset-0 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            key={`access-inner-${clickCount}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-white text-lg font-bold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              A11Y
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )
    } else {
      // Data Visualization
      return (
        <AnimatePresence>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`bar-${i}-${clickCount}`}
              className="absolute bottom-0 w-4 bg-white/80 rounded-t-md"
              style={{
                left: `${20 + i * 15}%`,
                height: `${10 + Math.random() * 40}%`,
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: "backOut",
              }}
            />
          ))}
        </AnimatePresence>
      )
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden border-border h-full cursor-pointer relative" onClick={handleClick}>
        <CardContent className="p-0">
          <div
            className={`${color} p-6 aspect-[3/2] relative flex flex-col items-center justify-center text-center overflow-hidden`}
          >
            <div className="mb-4 bg-white/20 backdrop-blur-sm p-3 rounded-full z-10">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2 z-10">{title}</h3>
            <p className="text-white/80 text-sm max-w-[80%] z-10">{description}</p>

            {/* Interactive elements */}
            <motion.div
              className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />

            {/* Micro-interactions container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">{renderMicroInteraction()}</div>

            {/* Interactive space wand element */}
            <motion.div
              className="absolute w-full h-full pointer-events-none z-0"
              animate={
                isActive
                  ? {
                      background: [
                        `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`,
                        `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`,
                        `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10" />
            <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/10" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

