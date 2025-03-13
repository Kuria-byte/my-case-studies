"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Check, Clock, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineItem {
  date: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
  duration: string
  startDate: Date
  endDate: Date
}

export function CollapsibleTimeline() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({})

  // Toggle description visibility
  const toggleDescription = (index: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const timelineItems: TimelineItem[] = [
    {
      date: "Jan 15, 2023",
      title: "Project Kickoff",
      description: "Initial stakeholder meetings and project planning. Defined project scope, objectives, and key deliverables.",
      status: "completed",
      duration: "2 weeks",
      startDate: new Date("2023-01-15"),
      endDate: new Date("2023-01-29"),
    },
    {
      date: "Feb 10, 2023",
      title: "User Research",
      description: "Conducted user interviews, surveys, and competitive analysis to understand user needs and market landscape.",
      status: "completed",
      duration: "3 weeks",
      startDate: new Date("2023-02-10"),
      endDate: new Date("2023-03-03"),
    },
    {
      date: "Mar 5, 2023",
      title: "Wireframing",
      description: "Created low-fidelity wireframes and user flows based on research insights. Conducted initial usability testing.",
      status: "completed",
      duration: "5 weeks",
      startDate: new Date("2023-03-05"),
      endDate: new Date("2023-04-09"),
    },
    {
      date: "Apr 15, 2023",
      title: "UI Design",
      description: "Developed high-fidelity mockups and design system. Iterated based on stakeholder feedback.",
      status: "completed",
      duration: "4 weeks",
      startDate: new Date("2023-04-15"),
      endDate: new Date("2023-05-13"),
    },
    {
      date: "May 20, 2023",
      title: "Prototyping",
      description: "Built interactive prototypes for user testing. Refined design based on usability findings.",
      status: "completed",
      duration: "3 weeks",
      startDate: new Date("2023-05-20"),
      endDate: new Date("2023-06-10"),
    },
    {
      date: "Jun 15, 2023",
      title: "Development",
      description: "Front-end and back-end implementation. Regular code reviews and QA testing.",
      status: "completed",
      duration: "8 weeks",
      startDate: new Date("2023-06-15"),
      endDate: new Date("2023-08-10"),
    },
    {
      date: "Aug 15, 2023",
      title: "Testing & Refinement",
      description: "Comprehensive testing, bug fixing, and performance optimization.",
      status: "completed",
      duration: "4 weeks",
      startDate: new Date("2023-08-15"),
      endDate: new Date("2023-09-12"),
    },
    {
      date: "Sep 15, 2023",
      title: "Launch",
      description: "Product launch and post-launch monitoring.",
      status: "completed",
      duration: "2 weeks",
      startDate: new Date("2023-09-15"),
      endDate: new Date("2023-09-29"),
    },
  ]

  // Filter based on view type
  const filteredItems = timelineItems

  // Determine how many items to show
  const visibleItems = isExpanded ? filteredItems : filteredItems.slice(0, 2)

  // Check if on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="relative bg-background/30 p-6 rounded-lg border border-border/40">
    

      {/* Timeline vertical line with better connection to indicators */}
      <div className="absolute left-[1.5rem] top-[5.5rem] bottom-16 w-[2px] bg-primary/30" />
      
      <div className="space-y-6">
        {visibleItems.map((item, index) => {
          // Determine status color
          const statusColor = item.status === "completed" 
            ? "bg-emerald-500" 
            : item.status === "in-progress" 
              ? "bg-amber-500" 
              : "bg-slate-400";
              
          return (
            <div key={index} className="relative">
              {/* Status indicator with clear visual hierarchy */}
              <div className="absolute left-0 top-0 flex items-center justify-center z-10">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center border-4 border-background ${statusColor} text-white`}>
                  {item.status === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : item.status === "in-progress" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </div>
              </div>
              
              {/* Clickable timeline item with visual affordance */}
              <div className="ml-16 relative">
                <button 
                  onClick={() => toggleDescription(index)}
                  className="w-full text-left group focus:outline-none"
                  aria-expanded={!!expandedDescriptions[index]}
                >
                  {/* Card with hover effect to indicate interactivity */}
                  <div className="bg-background/50 hover:bg-background/70 transition-colors p-4 rounded-lg border border-border/40 shadow-sm group-focus:ring-2 group-focus:ring-primary/30">
                    <div className="flex flex-col space-y-2">
                      {/* Top row with date and status */}
                      <div className="flex justify-between items-center">
                        {/* Date with consistent styling */}
                        <div className="text-sm text-muted-foreground">
                          {item.date}
                        </div>
                        
                        {/* Status badge */}
                        <Badge 
                          className={`
                            ${item.status === "completed" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : 
                              item.status === "in-progress" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : 
                              "bg-slate-400/10 text-slate-400 hover:bg-slate-400/20"}
                          `}
                        >
                          {item.status === "completed" ? "Completed" : 
                           item.status === "in-progress" ? "In Progress" : 
                           "Upcoming"}
                        </Badge>
                      </div>
                      
                      {/* Title with proper emphasis */}
                      <h4 className="text-base font-medium">{item.title}</h4>
                      
                      {/* Duration badge with consistent placement */}
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-primary/5 text-primary">
                          {item.duration}
                        </Badge>
                        
                        {/* Expand/collapse indicator */}
                        <div className="ml-auto text-sm text-muted-foreground flex items-center">
                          {expandedDescriptions[index] ? "Hide details" : "Show details"}
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedDescriptions[index] ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                
                {/* Collapsible Description with animation */}
                <AnimatePresence>
                  {expandedDescriptions[index] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="bg-background/50 p-4 rounded-lg border border-border/40 text-sm">
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length > 2 && (
        <div className="mt-6 flex justify-center relative z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show More ({filteredItems.length - 2} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
