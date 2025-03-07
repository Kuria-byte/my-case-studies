"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Lightbulb, Sparkles, Zap } from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"
import DesignChallengeGenerator from "./design-challenge-generator"

export function CollapsibleDesignChallenge() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Magic wand animation
  const magicWandAnimation = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.2, 1],
      rotate: [0, 15, -15, 0],
    },
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.5, 0.75, 1]
    }
  }

  return (
    <Card className="overflow-hidden border border-border/50 hover-lift rounded-xl shadow-md">
      <div className="relative">
        {/* Collapsed View */}
        {!isExpanded && (
          <CardHeader className="p-6 relative bg-zinc-900">
            {/* Subtle pattern overlay */}
            <div 
              className="absolute inset-0 z-1 opacity-5" 
              style={{ 
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3.5 rounded-xl flex items-center justify-center relative overflow-hidden"
                    whileHover={magicWandAnimation.animate}
                    transition={magicWandAnimation.transition}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    style={{
                      background: "linear-gradient(135deg, rgba(6, 214, 160, 0.3), rgba(17, 138, 178, 0.3))",
                      boxShadow: "0 0 20px rgba(6, 214, 160, 0.15)"
                    }}
                  >
                    {isHovered ? (
                      <Sparkles className="h-6 w-6 text-[#FFD166]" />
                    ) : (
                      <Lightbulb className="h-6 w-6 text-[#06D6A0]" />
                    )}
                    
                    {/* Sparkle effects */}
                    <motion.div 
                      className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#FFD166]"
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                    <motion.div 
                      className="absolute bottom-1 left-1 h-1.5 w-1.5 rounded-full bg-[#06D6A0]"
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1.2
                      }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-xl text-white flex items-center gap-2">
                      Design Challenge Generator
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/30">
                        Interactive
                      </span>
                    </h3>
                    <p className="text-sm text-gray-300 mt-1.5 max-w-md leading-relaxed">
                      Test your UX skills with randomly generated design challenges. Expand to generate and solve challenges.
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: "linear-gradient(to right, #06D6A0, #118AB2)",
                    boxShadow: "0 4px 10px rgba(6, 214, 160, 0.2)"
                  }}
                >
                  <span className="relative z-10 font-medium">Generate Challenge</span>
                  <Zap className="h-4 w-4 relative z-10" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </motion.button>
              </div>
            </div>
          </CardHeader>
        )}

        {/* Expanded View */}
        {isExpanded && (
          <div className="relative">
            <div className="bg-zinc-900 p-6 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3.5 rounded-xl flex items-center justify-center relative overflow-hidden"
                  whileHover={magicWandAnimation.animate}
                  transition={magicWandAnimation.transition}
                  style={{
                    background: "linear-gradient(135deg, rgba(6, 214, 160, 0.3), rgba(17, 138, 178, 0.3))",
                    boxShadow: "0 0 20px rgba(6, 214, 160, 0.15)"
                  }}
                >
                  <Lightbulb className="h-6 w-6 text-[#06D6A0]" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl text-white flex items-center gap-2">
                    Design Challenge Generator
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/30">
                      Interactive
                    </span>
                  </h3>
                </div>
              </div>
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: "linear-gradient(to right, #118AB2, #06D6A0)",
                  boxShadow: "0 4px 10px rgba(6, 214, 160, 0.2)"
                }}
              >
                <span className="relative z-10 font-medium">Collapse</span>
                <ChevronUp className="h-4 w-4 relative z-10" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.button>
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DesignChallengeGenerator />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </Card>
  )
}
