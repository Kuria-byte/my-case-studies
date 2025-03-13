"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CollapsibleCaseStudiesProps {
  children: React.ReactNode
  mobileVisibleCount?: number
  desktopVisibleCount?: number
}

export function CollapsibleCaseStudies({
  children,
  mobileVisibleCount = 3,
  desktopVisibleCount = 3
}: CollapsibleCaseStudiesProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Convert children to array to manipulate them
  const childrenArray = React.Children.toArray(children)
  
  // Calculate how many items to show based on screen size and expanded state
  const visibleChildren = isExpanded 
    ? childrenArray 
    : childrenArray.slice(0, mobileVisibleCount)
  
  // Calculate if there are hidden items
  const hasHiddenItems = childrenArray.length > mobileVisibleCount

  // Check scroll position to determine if scroll buttons should be visible
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        )
      }
    }

    // Initial check
    checkScroll()

    // Set up event listener
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
    }

    // Clean up
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  // Scroll functions
  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Desktop View - Horizontal Scrolling with Fixed Width */}
      <div className="hidden md:block relative">
        {/* Scroll buttons */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 shadow-md hover:bg-background/90 transition-all duration-300"
                onClick={scrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {canScrollRight && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 shadow-md hover:bg-background/90 transition-all duration-300"
                onClick={scrollRight}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Container with fixed width to show exactly 3 cards */}
        <div className="w-full overflow-hidden border border-transparent">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scrollbar-hide"
          >
            <div className="flex space-x-6">
              {childrenArray.map((child, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "w-[calc((100%/3)-16px)] flex-shrink-0",
                    "transition-all duration-500 ease-in-out"
                  )}
                >
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator dots */}
        {childrenArray.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {childrenArray.map((_, index) => (
              <motion.div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-in-out",
                  index < Math.min(4, childrenArray.length) 
                    ? "w-6 bg-primary/60" 
                    : "w-1.5 bg-muted"
                )}
                whileHover={{ scale: 1.2 }}
                animate={{
                  width: index < Math.min(4, childrenArray.length) ? 24 : 6,
                  opacity: index < Math.min(4, childrenArray.length) ? 1 : 0.5,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Mobile View - Collapsible Grid */}
      <div className="md:hidden space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence initial={false} mode="sync">
            {visibleChildren.map((child, index) => (
              <motion.div
                key={index}
                initial={isExpanded ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: isExpanded ? index * 0.1 : 0
                }}
              >
                {child}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Show More/Less Button */}
        {hasHiddenItems && (
          <AnimatePresence mode="wait">
            <motion.div 
              key={isExpanded ? "less" : "more"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 px-4 transition-all duration-300 hover:bg-primary/5"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
