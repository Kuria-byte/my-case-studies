"use client"

import { motion } from "framer-motion"
import { Coffee, MessageSquare, Calendar } from "lucide-react"

export const AnimatedCoffeeIcon = ({ className = "h-10 w-10" }) => {
  return (
    <motion.div className={`relative ${className}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Coffee className="text-primary" />

      {/* Steam animation */}
      <motion.div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 opacity-0"
        animate={{
          opacity: [0, 0.7, 0],
          y: [-2, -10],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6,10 Q9,5 12,10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-primary/60"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export const AnimatedMessageIcon = ({ className = "h-10 w-10" }) => {
  return (
    <motion.div className={`relative ${className}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <MessageSquare className="text-primary" />

      {/* Notification dot animation */}
      <motion.div
        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Floating message animation */}
      <motion.div
        className="absolute -top-3 -right-2 opacity-0"
        animate={{
          y: [-2, -10, -2],
          opacity: [0, 0.8, 0],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8,5 L16,5 L16,12 L12,16 L8,12 Z"
            fill="currentColor"
            className="text-primary/40"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export const AnimatedCalendarIcon = ({ className = "h-6 w-6" }) => {
  return (
    <motion.div className={`relative ${className}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Calendar className="text-primary" />

      {/* Highlight animation */}
      <motion.div
        className="absolute inset-0 bg-primary rounded-md"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
    </motion.div>
  )
}
