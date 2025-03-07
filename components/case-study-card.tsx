"use client"
import Image from "next/image"
import { ArrowRight, Lock, Users, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface CaseStudyCardProps {
  title: string
  description: string
  category: string
  color: string
  metrics?: {
    users?: number
    timeReduced?: number
    improvement?: number
  }
  image?: string
  onClick?: () => void
  disabled?: boolean
}

export function CaseStudyCard({
  title,
  description,
  category,
  color,
  metrics,
  image = "/placeholder.jpg",
  onClick,
  disabled = false
}: CaseStudyCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ${
          disabled ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        onClick={!disabled ? onClick : undefined}
      >
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-48 w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Content Section */}
          <div className="relative p-6 space-y-4">
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />

            {/* Category Badge */}
            <div className="flex items-center justify-between">
              <Badge
                className="px-3 py-1"
                style={{
                  backgroundColor: `${color}10`,
                  color: color,
                  borderColor: color,
                  borderWidth: '1px'
                }}
              >
                {category}
              </Badge>
            </div>

            {/* Title and Description */}
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>

            {/* Metrics Section */}
            {metrics && !disabled && (
              <div className="grid grid-cols-3 gap-2 pt-2">
                {metrics.users && (
                  <div className="space-y-1">
                    <div className="flex items-center text-[#06D6A0]">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Users</span>
                    </div>
                    <p className="text-sm font-semibold">{metrics.users}k+</p>
                  </div>
                )}
                {metrics.timeReduced && (
                  <div className="space-y-1">
                    <div className="flex items-center text-[#118AB2]">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Time</span>
                    </div>
                    <p className="text-sm font-semibold">-{metrics.timeReduced}%</p>
                  </div>
                )}
                {metrics.improvement && (
                  <div className="space-y-1">
                    <div className="flex items-center text-[#FFD166]">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Impact</span>
                    </div>
                    <p className="text-sm font-semibold">+{metrics.improvement}%</p>
                  </div>
                )}
              </div>
            )}

            {/* Action Section */}
            <div className="pt-2 flex items-center justify-between">
              {disabled ? (
                <div className="flex items-center text-muted-foreground">
                  <Lock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Coming Soon</span>
                </div>
              ) : (
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 4 }}
                >
                  <span 
                    className="text-sm font-medium mr-2"
                    style={{ color }}
                  >
                    View Case Study
                  </span>
                  <ArrowRight className="h-4 w-4" style={{ color }} />
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
