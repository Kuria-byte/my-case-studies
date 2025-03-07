"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronLeft, ChevronRight, Vote } from "lucide-react"
import Image from "next/image"

interface DesignOption {
  id: string
  name: string
  image: string
  description: string
  votes: number
}

export function ABTesting() {
  const [designOptions, setDesignOptions] = useState<DesignOption[]>([
    {
      id: "design-a",
      name: "Design A",
      image: "/placeholder.svg?height=300&width=500",
      description: "Minimalist approach with focus on content hierarchy and whitespace",
      votes: 64,
    },
    {
      id: "design-b",
      name: "Design B",
      image: "/placeholder.svg?height=300&width=500",
      description: "Bold visual elements with emphasis on color and imagery",
      votes: 36,
    },
  ])

  const [selectedDesign, setSelectedDesign] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [currentView, setCurrentView] = useState<"comparison" | "details">("comparison")
  const [currentDesign, setCurrentDesign] = useState(0)

  const totalVotes = designOptions.reduce((sum, option) => sum + option.votes, 0)

  const handleVote = (designId: string) => {
    if (hasVoted) return

    setSelectedDesign(designId)
    setIsVoting(true)

    // Simulate API call
    setTimeout(() => {
      setDesignOptions((prev) =>
        prev.map((option) => (option.id === designId ? { ...option, votes: option.votes + 1 } : option)),
      )
      setIsVoting(false)
      setHasVoted(true)
    }, 1000)
  }

  const handleNextDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % designOptions.length)
  }

  const handlePrevDesign = () => {
    setCurrentDesign((prev) => (prev - 1 + designOptions.length) % designOptions.length)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="h-5 w-5" />
          A/B Testing
        </CardTitle>
        <CardDescription>Vote for your preferred design approach</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" onValueChange={(value) => setCurrentView(value as "comparison" | "details")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="comparison">Side by Side</TabsTrigger>
            <TabsTrigger value="details">Design Details</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {designOptions.map((option) => (
                <div key={option.id} className="flex flex-col">
                  <div className="relative aspect-video mb-3 overflow-hidden rounded-lg border">
                    <Image src={option.image || "/placeholder.svg"} alt={option.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-medium mb-1">{option.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 flex-1">{option.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{Math.round((option.votes / totalVotes) * 100)}% of votes</span>
                        <span>{option.votes} votes</span>
                      </div>
                      <Progress value={(option.votes / totalVotes) * 100} className="h-2" />
                    </div>

                    <Button
                      className="mt-3 w-full"
                      variant={selectedDesign === option.id ? "default" : "outline"}
                      disabled={hasVoted || isVoting}
                      onClick={() => handleVote(option.id)}
                    >
                      {isVoting && selectedDesign === option.id ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Voting...
                        </span>
                      ) : hasVoted && selectedDesign === option.id ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          Voted
                        </span>
                      ) : (
                        `Vote for ${option.name}`
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={designOptions[currentDesign].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                  <Image
                    src={designOptions[currentDesign].image || "/placeholder.svg"}
                    alt={designOptions[currentDesign].name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">{designOptions[currentDesign].name}</h3>
                  <p className="text-muted-foreground mb-4">{designOptions[currentDesign].description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Popularity</span>
                      <span>{Math.round((designOptions[currentDesign].votes / totalVotes) * 100)}%</span>
                    </div>
                    <Progress value={(designOptions[currentDesign].votes / totalVotes) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      {designOptions[currentDesign].votes} out of {totalVotes} votes
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="icon" onClick={handlePrevDesign}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant={selectedDesign === designOptions[currentDesign].id ? "default" : "outline"}
                    disabled={hasVoted || isVoting}
                    onClick={() => handleVote(designOptions[currentDesign].id)}
                  >
                    {isVoting && selectedDesign === designOptions[currentDesign].id ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Voting...
                      </span>
                    ) : hasVoted && selectedDesign === designOptions[currentDesign].id ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Voted
                      </span>
                    ) : (
                      `Vote for ${designOptions[currentDesign].name}`
                    )}
                  </Button>

                  <Button variant="outline" size="icon" onClick={handleNextDesign}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

