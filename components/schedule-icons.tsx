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
     
      </motion.div>
    </motion.div>
  )
}

export const AnimatedMessageIcon = ({ className = "h-10 w-10" }) => {
  return (
    <motion.div className={`relative ${className}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      {/* Using a simple microphone icon from Lucide */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
      </svg>

      {/* Simple pulse animation */}
      <motion.div
        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Simple sound wave animation */}
      <motion.div
        className="absolute -top-3 right-1/2 transform translate-x-1/2 w-6 h-6 opacity-0"
        animate={{
          opacity: [0, 0.7, 0],
          y: [-2, -8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
     
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
