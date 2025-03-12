"use client"
import Image from "next/image"
import { ArrowRight, Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"

interface Metric {
  label: string
  value: string
}

interface CaseStudyCardProps {
  title: string
  description: string
  image: string
  color: string
  tags: string[]
  metrics: Metric[]
  locked: boolean
  lockReason?: string
  onClick: () => void
}

export function CaseStudyCard({
  title,
  description,
  image,
  color,
  tags,
  metrics,
  locked,
  lockReason = "Premium Content",
  onClick,
}: CaseStudyCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div className="group block" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <div className="rounded-lg overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg relative">
        {/* Simplified header with more subtle background */}
        <div className="bg-muted p-6 aspect-video relative">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain p-4" />
          {locked && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  {lockReason === "NDA Protected" ? (
                    <ShieldCheck className="h-6 w-6 text-white" />
                  ) : (
                    <Lock className="h-6 w-6 text-white" />
                  )}
                </div>
                <p className="text-white font-medium">{lockReason}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={onClick}
                >
                  Access Content
                </Button>
              </div>
            </div>
          )}
          <motion.div
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight className="h-4 w-4 text-foreground" />
          </motion.div>
        </div>

        <div className="p-5">
          {/* Title and description with more spacing */}
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

          {/* Simplified tags with consistent styling */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Simplified metrics with consistent color scheme */}
          {metrics.length > 0 && (
            <div className="py-3 border-t border-border grid grid-cols-3 gap-2">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-bold text-foreground">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Button with consistent styling */}
          <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onClick}>
            {locked ? "Request Access" : "View Case Study"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

