"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { BookOpen, Code, FileText, PenToolIcon as Tool, Video } from "lucide-react"

interface UXResourceTabsProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  className?: string
}

export function UXResourceTabs({ activeCategory, setActiveCategory, className }: UXResourceTabsProps) {
  const { theme } = useTheme()
  const [scrollPosition, setScrollPosition] = useState(0)

  const tabs = [
    { id: "article", label: "Articles", icon: <FileText className="h-4 w-4" /> },
    { id: "book", label: "Books", icon: <BookOpen className="h-4 w-4" /> },
    { id: "tool", label: "Tools", icon: <Tool className="h-4 w-4" /> },
    { id: "template", label: "Templates", icon: <Code className="h-4 w-4" /> },
    { id: "video", label: "Videos", icon: <Video className="h-4 w-4" /> },
  ]

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft)
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-1 px-1 -mx-1"
        onScroll={handleScroll}
      >
        <div className="flex space-x-1 min-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={cn(
                "flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 snap-start",
                activeCategory === tab.id
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {activeCategory === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-background"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicators */}
      {scrollPosition > 10 && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      )}
      {scrollPosition < 100 && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      )}
    </div>
  )
}
