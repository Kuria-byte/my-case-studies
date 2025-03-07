"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  solution: string
}

export function KeyChallenges() {
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null)

  const challenges: Challenge[] = [
    {
      id: "challenge-1",
      title: "Complex Financial Workflows",
      description:
        "Users struggled with multi-step reconciliation processes that were time-consuming and error-prone. The complexity of financial workflows made it difficult for non-technical users to complete tasks efficiently.",
      solution:
        "We simplified the workflow by breaking it down into smaller, more manageable steps with clear progress indicators. We also implemented smart defaults and contextual help to guide users through complex processes.",
    },
    {
      id: "challenge-2",
      title: "Low Connectivity Environments",
      description:
        "Many users operated in areas with limited or unreliable internet access, making it difficult to ensure data integrity and consistent user experience.",
      solution:
        "We developed a robust offline-first architecture that allowed users to work without an internet connection. Data synchronization occurs automatically when connectivity is restored, with conflict resolution mechanisms to maintain data integrity.",
    },
    {
      id: "challenge-3",
      title: "Financial Literacy Barriers",
      description:
        "Users had varying levels of financial knowledge, making it challenging to create interfaces that were accessible to everyone without overwhelming novice users or frustrating experts.",
      solution:
        "We implemented progressive disclosure techniques to present information at appropriate levels of complexity. Advanced features are available but not obtrusive, while contextual education helps users understand financial concepts as needed.",
    },
    {
      id: "challenge-4",
      title: "Security Concerns",
      description:
        "Financial applications require robust security, but excessive security measures can create friction in the user experience and discourage adoption.",
      solution:
        "We balanced security and usability by implementing risk-based authentication, clear security indicators, and streamlined verification processes that maintain high security standards without unnecessary friction.",
    },
  ]

  const toggleChallenge = (id: string) => {
    setExpandedChallenge((prev) => (prev === id ? null : id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Key Challenges
        </CardTitle>
        <CardDescription>Major obstacles encountered and how they were overcome</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-muted/50 hover:bg-muted"
                onClick={() => toggleChallenge(challenge.id)}
              >
                <h3 className="font-medium">{challenge.title}</h3>
                <button className="p-1 rounded-full hover:bg-background">
                  {expandedChallenge === challenge.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {expandedChallenge === challenge.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 border-t">
                      <p className="text-muted-foreground mb-4">{challenge.description}</p>

                      <div className="flex items-start gap-3 bg-primary/10 p-3 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Solution</p>
                          <p className="text-sm">{challenge.solution}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

