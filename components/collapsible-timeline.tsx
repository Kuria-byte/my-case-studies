"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TimelineItem {
  date: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
}

export function CollapsibleTimeline() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const timelineItems: TimelineItem[] = [
    {
      date: "Jan 15, 2023",
      title: "Project Kickoff",
      description: "Initial stakeholder meetings and project planning",
      status: "completed",
    },
    {
      date: "Feb 10, 2023",
      title: "User Research",
      description: "Conducted 24 interviews with financial agents, merchants, and end-users",
      status: "completed",
    },
    {
      date: "Mar 5, 2023",
      title: "Wireframing",
      description: "Created low-fidelity wireframes based on research insights",
      status: "completed",
    },
    {
      date: "Apr 12, 2023",
      title: "Usability Testing",
      description: "Conducted first round of usability testing with 12 participants",
      status: "completed",
    },
    {
      date: "May 20, 2023",
      title: "High-Fidelity Design",
      description: "Finalized UI design and created interactive prototype",
      status: "completed",
    },
    {
      date: "Jun 15, 2023",
      title: "Development Handoff",
      description: "Delivered design specifications and assets to development team",
      status: "completed",
    },
    {
      date: "Jul 30, 2023",
      title: "Beta Launch",
      description: "Released beta version to select users for feedback",
      status: "completed",
    },
    {
      date: "Aug 25, 2023",
      title: "Full Launch",
      description: "Official product launch across all target markets",
      status: "in-progress",
    },
  ]

  // Check if we're on mobile
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

  // Determine which items to show - always show only 4 items initially, regardless of device
  const visibleItems = isExpanded ? timelineItems : timelineItems.slice(0, 4)

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2A2A2A]" />
      <div className="space-y-8">
        {visibleItems.map((item, index) => (
          <div key={index} className="relative pl-10">
            <div
              className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center ${
                item.status === "completed"
                  ? "bg-[#06D6A0]/20 text-[#06D6A0]"
                  : item.status === "in-progress"
                    ? "bg-[#FFD166]/20 text-[#FFD166]"
                    : "bg-[#71717A]/20 text-[#71717A]"
              }`}
            >
              {item.status === "completed" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : item.status === "in-progress" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="text-sm text-white/50">{item.date}</div>
              <div className="hidden sm:block text-white/50 mx-2">•</div>
              <div className="font-medium">{item.title}</div>
            </div>
            <div className="text-sm text-white/70 mt-1">{item.description}</div>
          </div>
        ))}
      </div>

      {timelineItems.length > 4 && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="gap-2">
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show More ({timelineItems.length - 4} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

