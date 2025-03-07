"use client"

import { motion } from "framer-motion"
import { Coffee, MessageSquare } from "lucide-react"

export const InteractiveCoffeeIcon = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className}`}>
      <Coffee className="text-primary" />

      {/* Steam animation */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
      >
        <motion.path
          d="M6,8 Q8,5 10,8 T14,8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-primary/40"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 0.8, 0],
            y: [-2, -8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M10,8 Q12,5 14,8 T18,8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-primary/40"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 0.6, 0],
            y: [-2, -10],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.svg>
    </div>
  )
}

export const InteractiveMessageIcon = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className}`}>
      <MessageSquare className="text-primary" />

      {/* Chat bubble animation */}
      <motion.div
        className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
          width: ["16px", "16px", "16px", "16px"],
          height: ["16px", "16px", "16px", "16px"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.2, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          !
        </motion.span>
      </motion.div>
    </div>
  )
}

