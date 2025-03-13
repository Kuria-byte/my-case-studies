"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Lightbulb, Pencil, Braces, ArrowRight, ArrowLeft, Maximize2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function IdeationGallery() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const ideationStages = [
    {
      title: "Brainstorming",
      description: "Initial brainstorming sessions with stakeholders to identify key problems and opportunities",
      image: "/images/team.webp",
      icon: Lightbulb,
      notes:
        "We conducted 3 collaborative workshops with stakeholders from different departments to ensure diverse perspectives. Key techniques used included mind mapping, crazy eights, and affinity diagrams.",
    },
    {
      title: "Sketching & Wireframing",
      description: "Low-fidelity sketches exploring different UI approaches and information architecture",
      image: "/images/rejaw2.png",
      icon: Pencil,
      notes:
        "After identifying the core user needs, we created over 20 different sketches exploring various approaches to the reconciliation interface. We focused on simplifying complex workflows while maintaining necessary functionality.",
    },
    {
      title: "Concept Validation",
      description: "Testing early concepts with users to validate assumptions and refine direction",
      image: "/images/rejaui.png",
      icon: Braces,
      notes:
        "We tested 5 different concept directions with 8 users representing different roles within financial institutions. This early validation helped us eliminate approaches that were too complex or didn't align with mental models.",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === ideationStages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? ideationStages.length - 1 : prev - 1))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-[#FFD166]" />
          Ideation Process
        </CardTitle>
        <CardDescription>Exploring solutions through collaborative design thinking</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Visual Gallery</TabsTrigger>
            <TabsTrigger value="process">Process Details</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-4">
            <div className="relative overflow-hidden rounded-lg">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-2 z-10 bg-background/80"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span className="sr-only">View full size</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="aspect-video relative">
                      <Image
                        src={ideationStages[currentSlide].image || "/placeholder.svg"}
                        alt={ideationStages[currentSlide].title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{ideationStages[currentSlide].description}</p>
                  </DialogContent>
                </Dialog>

                <Image
                  src={ideationStages[currentSlide].image || "/placeholder.svg"}
                  alt={ideationStages[currentSlide].title}
                  fill
                  className="object-cover transition-all"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/70">
                  <h3 className="text-lg font-semibold">{ideationStages[currentSlide].title}</h3>
                  <p className="text-sm text-muted-foreground">{ideationStages[currentSlide].description}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Previous slide</span>
                </Button>

                <div className="flex gap-1">
                  {ideationStages.map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className={`h-2 w-2 rounded-full p-0 ${currentSlide === index ? "bg-primary" : "bg-muted"}`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <span className="sr-only">Go to slide {index + 1}</span>
                    </Button>
                  ))}
                </div>

                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Next slide</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-4 space-y-4">
            {ideationStages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                  <stage.icon className="h-5 w-5 text-[#FFD166]" />
                </div>
                <div>
                  <h3 className="font-medium">{stage.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{stage.notes}</p>
                </div>
              </motion.div>
            ))}

            <div className="rounded-lg border border-border bg-muted/50 p-4 mt-4">
              <h3 className="font-medium">Key Insights from Ideation</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFD166]" />
                  <span>Users needed a unified view of transactions across multiple payment platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFD166]" />
                  <span>Offline functionality was critical for agents working in areas with poor connectivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFD166]" />
                  <span>Automated reconciliation would save hours of manual work and reduce human error</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
