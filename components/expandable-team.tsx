"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  skills: string[]
  link?: string
}

export function ExpandableTeam() {
  const [isExpanded, setIsExpanded] = useState(false)

  const teamMembers: TeamMember[] = [
    {
      id: "member-1",
      name: "Sarah Johnson",
      role: "Lead UX Designer",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["Research", "Wireframing", "Prototyping"],
      link: "#",
    },
    {
      id: "member-2",
      name: "Michael Chen",
      role: "UI Designer",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["Visual Design", "Illustration", "Animation"],
      link: "#",
    },
    {
      id: "member-3",
      name: "Aisha Patel",
      role: "UX Researcher",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["User Testing", "Interviews", "Data Analysis"],
      link: "#",
    },
    {
      id: "member-4",
      name: "David Kim",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["React", "TypeScript", "Tailwind"],
      link: "#",
    },
    {
      id: "member-5",
      name: "Elena Rodriguez",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["Strategy", "Roadmapping", "Stakeholder Management"],
      link: "#",
    },
    {
      id: "member-6",
      name: "James Wilson",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["Node.js", "MongoDB", "API Design"],
      link: "#",
    },
    {
      id: "member-7",
      name: "Olivia Taylor",
      role: "QA Engineer",
      avatar: "/placeholder.svg?height=100&width=100",
      skills: ["Testing", "Automation", "Documentation"],
      link: "#",
    },
  ]

  // Show only first 3 members when not expanded
  const visibleMembers = isExpanded ? teamMembers : teamMembers.slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card/50 rounded-lg p-4 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {member.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            {member.link && (
              <Button variant="ghost" size="sm" className="w-full text-xs gap-1 h-7">
                View Profile <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {teamMembers.length > 3 && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="gap-2">
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show More Team Members ({teamMembers.length - 3})
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

