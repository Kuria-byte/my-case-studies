"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Layers, ArrowRight, ArrowLeft, Maximize2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function DesignEvolution() {
  const [currentStage, setCurrentStage] = useState(0)

  const designStages = [
    {
      title: "Wireframes",
      description: "Initial low-fidelity wireframes focusing on information architecture and user flows",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      notes:
        "We started with simple wireframes to establish the core structure and information hierarchy. The focus was on creating a logical flow for reconciliation tasks.",
    },
    {
      title: "Mid-fidelity Mockups",
      description: "Refined designs with improved visual hierarchy and interaction patterns",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      notes:
        "Based on feedback from the wireframe testing, we improved the transaction filtering system and added a quick reconciliation feature that users requested.",
    },
    {
      title: "High-fidelity Designs",
      description: "Polished designs with complete visual styling and micro-interactions",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      notes:
        "The final designs incorporated the brand identity and focused on accessibility improvements. We added visual cues to help users identify transaction status more quickly.",
    },
  ]

  const nextStage = () => {
    setCurrentStage((prev) => (prev === designStages.length - 1 ? 0 : prev + 1))
  }

  const prevStage = () => {
    setCurrentStage((prev) => (prev === 0 ? designStages.length - 1 : prev - 1))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Layers className="mr-2 h-5 w-5 text-[#06D6A0]" />
          Design Evolution
        </CardTitle>
        <CardDescription>From wireframes to high-fidelity designs</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comparison">Before & After</TabsTrigger>
            <TabsTrigger value="process">Design Decisions</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{designStages[currentStage].title}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={prevStage} className="h-8 w-8 p-0">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous stage</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextStage} className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next stage</span>
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{designStages[currentStage].description}</p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm"
                      >
                        <Maximize2 className="h-4 w-4" />
                        <span className="sr-only">View full size</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="aspect-video relative">
                        <Image
                          src={designStages[currentStage].beforeImage || "/placeholder.svg"}
                          alt={`${designStages[currentStage].title} - Before`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Initial design approach</p>
                    </DialogContent>
                  </Dialog>

                  <Image
                    src={designStages[currentStage].beforeImage || "/placeholder.svg"}
                    alt={`${designStages[currentStage].title} - Before`}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 backdrop-blur-sm">
                    <p className="text-xs font-medium">Before</p>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm"
                      >
                        <Maximize2 className="h-4 w-4" />
                        <span className="sr-only">View full size</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="aspect-video relative">
                        <Image
                          src={designStages[currentStage].afterImage || "/placeholder.svg"}
                          alt={`${designStages[currentStage].title} - After`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Refined design based on feedback</p>
                    </DialogContent>
                  </Dialog>

                  <Image
                    src={designStages[currentStage].afterImage || "/placeholder.svg"}
                    alt={`${designStages[currentStage].title} - After`}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 backdrop-blur-sm">
                    <p className="text-xs font-medium">After</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-sm text-muted-foreground">{designStages[currentStage].notes}</div>
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Key Design Decisions</h3>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="font-medium text-[#FFD166]">Transaction List View</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We switched from a traditional table to a card-based layout for better mobile responsiveness. This
                      improved usability on smaller screens while maintaining the ability to see key transaction details
                      at a glance.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="font-medium text-[#06D6A0]">Reconciliation Workflow</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We simplified the reconciliation process from 7 steps to 3 steps based on user feedback. The new
                      workflow uses progressive disclosure to show only relevant information at each stage.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="font-medium text-[#118AB2]">Offline Mode Indicators</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We added clear visual indicators for offline mode, with status badges showing which transactions
                      would be synced when connectivity was restored. This addressed a major pain point for field
                      agents.
                    </p>
                  </motion.div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Design System Evolution</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="aspect-square rounded-md bg-[#FFD166]"></div>
                    <p className="text-xs text-center">#FFD166</p>
                    <p className="text-xs text-center text-muted-foreground">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="aspect-square rounded-md bg-[#06D6A0]"></div>
                    <p className="text-xs text-center">#06D6A0</p>
                    <p className="text-xs text-center text-muted-foreground">Success</p>
                  </div>
                  <div className="space-y-2">
                    <div className="aspect-square rounded-md bg-[#118AB2]"></div>
                    <p className="text-xs text-center">#118AB2</p>
                    <p className="text-xs text-center text-muted-foreground">Info</p>
                  </div>
                  <div className="space-y-2">
                    <div className="aspect-square rounded-md bg-[#EF476F]"></div>
                    <p className="text-xs text-center">#EF476F</p>
                    <p className="text-xs text-center text-muted-foreground">Error</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

