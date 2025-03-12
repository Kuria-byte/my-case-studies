"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lightbulb, MessageSquare, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LessonsReflections() {
  const [openInsight, setOpenInsight] = useState<string | null>(null)

  const toggleInsight = (id: string) => {
    setOpenInsight(openInsight === id ? null : id)
  }

  const insights = [
    {
      id: "insight1",
      title: "Start with user pain points, not features",
      description:
        "We initially focused on adding new features, but user research revealed that solving existing pain points would deliver more value.",
      icon: Lightbulb,
      color: "#FFD166",
    },
    {
      id: "insight2",
      title: "Test with real data early",
      description:
        "Using real transaction data in our prototypes uncovered edge cases we wouldn't have found with sample data.",
      icon: CheckCircle2,
      color: "#06D6A0",
    },
    {
      id: "insight3",
      title: "Offline-first is harder than it seems",
      description:
        "Designing for offline use required rethinking our entire approach to data synchronization and error handling.",
      icon: AlertTriangle,
      color: "#EF476F",
    },
  ]

  const challenges = [
    {
      title: "Balancing Complexity vs. Simplicity",
      description:
        "Financial reconciliation is inherently complex, but the interface needed to be simple enough for users with varying technical skills.",
      solution:
        "We used progressive disclosure to hide complexity until needed, and created different views optimized for different user roles.",
    },
    {
      title: "Designing for Unreliable Connectivity",
      description:
        "Many users operate in areas with poor internet connectivity, making a traditional cloud-based approach problematic.",
      solution:
        "We implemented an offline-first architecture with local data storage and intelligent sync when connectivity was available.",
    },
    {
      title: "Stakeholder Alignment",
      description:
        "Different departments had competing priorities for the platform, leading to scope creep and conflicting requirements.",
      solution:
        "We facilitated collaborative workshops to create a shared vision and used impact/effort mapping to prioritize features.",
    },
  ]

  const personalGrowth = [
    {
      quote: "This project pushed me to become more comfortable with ambiguity and complexity in financial systems.",
      author: "Lead Designer",
    },
    {
      quote:
        "I learned that sometimes the most impactful design solutions come from deeply understanding the problem, not from adding more features.",
      author: "UX Researcher",
    },
    {
      quote:
        "Working with users in low-connectivity environments changed how I think about resilient design and graceful degradation.",
      author: "UI Designer",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-[#118AB2]" />
          Lessons & Reflections
        </CardTitle>
        <CardDescription>Insights gained and challenges overcome</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="growth">Personal Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="mt-4 space-y-4">
            {insights.map((insight) => (
              <Collapsible
                key={insight.id}
                open={openInsight === insight.id}
                onOpenChange={() => toggleInsight(insight.id)}
                className="rounded-lg border border-border"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left">
                  <div className="flex items-center">
                    <div
                      className="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${insight.color}20` }}
                    >
                      <insight.icon className="h-4 w-4" style={{ color: insight.color }} />
                    </div>
                    <h3 className="font-medium">{insight.title}</h3>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openInsight === insight.id ? "rotate-180" : ""}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 pt-0">
                  <div className="ml-11">
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </TabsContent>

          <TabsContent value="challenges" className="mt-4 space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg border border-border p-4"
              >
                <h3 className="font-medium">{challenge.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{challenge.description}</p>
                <div className="mt-3 flex items-start gap-2">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#06D6A0]/20">
                    <CheckCircle2 className="h-3 w-3 text-[#06D6A0]" />
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Solution:</span> {challenge.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="growth" className="mt-4">
            <div className="space-y-4">
              {personalGrowth.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="mt-1 h-5 w-5 flex-shrink-0 text-[#118AB2]" />
                    <div>
                      <p className="text-sm italic">"{item.quote}"</p>
                      <p className="mt-2 text-xs font-medium">{item.author}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <h3 className="font-medium">Team Learnings</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#118AB2]" />
                    <span>Involving users throughout the entire process led to more intuitive designs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#118AB2]" />
                    <span>Cross-functional collaboration improved our understanding of technical constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#118AB2]" />
                    <span>Regular design critiques helped catch usability issues early in the process</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

