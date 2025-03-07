"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lightbulb,
  RefreshCw,
  Clock,
  Share2,
  Send,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shuffle,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Types
interface DesignChallenge {
  id: number
  title: string
  description: string
  context: string
  constraints: string[]
  timeEstimate: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: "mobile" | "web" | "service" | "product" | "research"
  tags: string[]
}

interface DesignChallengeGeneratorProps {
  className?: string
}

// Changed to default export
export default function DesignChallengeGenerator({ className }: DesignChallengeGeneratorProps) {
  const { theme } = useTheme()
  const [currentChallenge, setCurrentChallenge] = useState<DesignChallenge | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [solution, setSolution] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("challenge")
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [generatedCount, setGeneratedCount] = useState(0)

  // Sample design challenges database
  const designChallenges: DesignChallenge[] = [
    {
      id: 1,
      title: "Elderly-Friendly Food Delivery App",
      description:
        "Design a food delivery app specifically for elderly users who may have limited technology experience and accessibility needs.",
      context:
        "The aging population is growing, but many digital services aren't designed with their needs in mind. Create an interface that addresses vision impairments, motor control limitations, and simplified workflows.",
      constraints: [
        "Must have high contrast and large text options",
        "Simplified checkout process with minimal steps",
        "Include voice command capabilities",
        "Provide clear error recovery paths",
      ],
      timeEstimate: "45 minutes",
      difficulty: "intermediate",
      category: "mobile",
      tags: ["accessibility", "mobile app", "food delivery"],
    },
    {
      id: 2,
      title: "Zero-Waste Shopping Experience",
      description:
        "Create a digital solution that helps shoppers reduce packaging waste when buying groceries or household items.",
      context:
        "Consumers are increasingly concerned about environmental impact. Design a service that helps them find, purchase, and track products with minimal or zero packaging waste.",
      constraints: [
        "Must include a way to locate zero-waste stores or products",
        "Include a personal impact dashboard showing waste reduction",
        "Design a reward system for sustainable choices",
        "Consider both online and in-store shopping experiences",
      ],
      timeEstimate: "60 minutes",
      difficulty: "advanced",
      category: "service",
      tags: ["sustainability", "e-commerce", "tracking"],
    },
    {
      id: 3,
      title: "Micro-Learning Platform Dashboard",
      description: "Design a dashboard for a platform that delivers bite-sized learning content to busy professionals.",
      context:
        "Working professionals want to continue learning but have limited time. Create a dashboard that helps them track progress, set goals, and fit learning into their schedule.",
      constraints: [
        "Sessions should be organizable in 5-15 minute blocks",
        "Include progress visualization across multiple courses",
        "Design for both desktop and mobile contexts",
        "Include social/community elements for accountability",
      ],
      timeEstimate: "30 minutes",
      difficulty: "beginner",
      category: "web",
      tags: ["education", "dashboard", "productivity"],
    },
    {
      id: 4,
      title: "Public Transportation Wayfinding System",
      description:
        "Design a digital wayfinding system for a complex public transportation hub (train station, airport, etc.).",
      context:
        "Navigation in large transportation centers can be confusing, especially for first-time visitors or those with language barriers. Create a solution that helps people find their way efficiently.",
      constraints: [
        "Must work without requiring an app download",
        "Should be accessible in multiple languages",
        "Include options for users with disabilities",
        "Consider both digital displays and personal device integration",
      ],
      timeEstimate: "90 minutes",
      difficulty: "advanced",
      category: "service",
      tags: ["wayfinding", "public space", "accessibility"],
    },
    {
      id: 5,
      title: "Collaborative Remote Whiteboard",
      description:
        "Design a digital whiteboard tool specifically for remote UX workshops and design thinking sessions.",
      context:
        "Remote teams need better tools for collaborative ideation. Create an interface that captures the spontaneity and visual thinking of in-person whiteboarding.",
      constraints: [
        "Support simultaneous editing by multiple users",
        "Include templates for common UX activities (journey maps, affinity diagrams, etc.)",
        "Design for both desktop and tablet use",
        "Include a way to organize and archive session results",
      ],
      timeEstimate: "45 minutes",
      difficulty: "intermediate",
      category: "product",
      tags: ["collaboration", "remote work", "design tools"],
    },
    {
      id: 6,
      title: "Health Habit Tracker for Families",
      description: "Design a solution that helps family members track and encourage healthy habits together.",
      context:
        "Families want to build healthy habits together but need tools that work for different ages and preferences. Create an experience that makes health tracking collaborative and fun.",
      constraints: [
        "Must be appropriate for users from ages 6 to adult",
        "Include gamification elements that motivate without creating unhealthy competition",
        "Design for privacy while still enabling sharing",
        "Consider how to handle different devices and tech literacy levels",
      ],
      timeEstimate: "60 minutes",
      difficulty: "intermediate",
      category: "mobile",
      tags: ["health", "family", "habit tracking"],
    },
    {
      id: 7,
      title: "Voice-First Smart Home Interface",
      description: "Design a voice-first interface for controlling smart home devices with minimal visual UI.",
      context:
        "Voice interfaces are becoming more common but often have usability issues. Create a solution that makes controlling smart home features intuitive through voice while providing appropriate visual feedback.",
      constraints: [
        "Primary interaction should be voice-based",
        "Include fallback methods for when voice fails",
        "Design for multiple user profiles in the same household",
        "Consider privacy and security concerns",
      ],
      timeEstimate: "45 minutes",
      difficulty: "advanced",
      category: "product",
      tags: ["voice UI", "smart home", "accessibility"],
    },
    {
      id: 8,
      title: "Community Tool-Sharing Platform",
      description: "Design a platform that allows neighbors to share rarely-used tools and equipment.",
      context:
        "Many household tools are used infrequently. Create a service that helps communities share resources, reducing consumption and building community connections.",
      constraints: [
        "Include trust and accountability features",
        "Design the item listing and request process",
        "Consider both digital and physical handoff experiences",
        "Include a community-building component",
      ],
      timeEstimate: "30 minutes",
      difficulty: "beginner",
      category: "service",
      tags: ["sharing economy", "community", "sustainability"],
    },
    {
      id: 9,
      title: "Inclusive Online Shopping Assistant",
      description:
        "Design a shopping assistant that helps users with cognitive disabilities shop online independently.",
      context:
        "Online shopping can be overwhelming for users with cognitive disabilities. Create a solution that simplifies the experience while preserving independence and dignity.",
      constraints: [
        "Use plain language and clear visual cues",
        "Include budgeting and decision support features",
        "Design for compatibility with screen readers and other assistive tech",
        "Consider how to handle complex decisions like size selection or product comparisons",
      ],
      timeEstimate: "60 minutes",
      difficulty: "advanced",
      category: "web",
      tags: ["accessibility", "e-commerce", "cognitive design"],
    },
    {
      id: 10,
      title: "Personal Carbon Footprint Tracker",
      description: "Design a mobile app that helps users track and reduce their personal carbon footprint.",
      context:
        "People want to reduce their environmental impact but often don't know where to start. Create an experience that educates, tracks, and motivates sustainable choices.",
      constraints: [
        "Make data entry simple and quick",
        "Provide actionable recommendations based on user behavior",
        "Include social comparison without shaming",
        "Design for both immediate and long-term behavior change",
      ],
      timeEstimate: "45 minutes",
      difficulty: "intermediate",
      category: "mobile",
      tags: ["sustainability", "tracking", "behavior change"],
    },
    {
      id: 11,
      title: "Multilingual Meeting Facilitator",
      description: "Design a tool that helps facilitate meetings between participants who speak different languages.",
      context:
        "Global teams and collaborations often involve multiple languages. Create a solution that reduces language barriers in real-time meetings.",
      constraints: [
        "Support both voice and text translation",
        "Design for minimal disruption to conversation flow",
        "Consider how to handle cultural differences beyond language",
        "Include features for meeting documentation in multiple languages",
      ],
      timeEstimate: "60 minutes",
      difficulty: "advanced",
      category: "product",
      tags: ["language", "collaboration", "meetings"],
    },
    {
      id: 12,
      title: "Neighborhood Emergency Response Network",
      description: "Design a community-based system for coordinating during local emergencies or disasters.",
      context:
        "During emergencies, communities often need to self-organize before official help arrives. Create a solution that helps neighborhoods coordinate resources and assistance.",
      constraints: [
        "Must work with limited or disrupted internet access",
        "Design for high-stress situations and urgent needs",
        "Include features for resource mapping and needs matching",
        "Consider privacy and security during vulnerable times",
      ],
      timeEstimate: "90 minutes",
      difficulty: "advanced",
      category: "service",
      tags: ["emergency", "community", "resilience"],
    },
  ]

  // Generate a random challenge
  const generateChallenge = () => {
    setIsGenerating(true)
    setIsSubmitted(false)
    setSolution("")

    // Simulate loading
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * designChallenges.length)
      setCurrentChallenge(designChallenges[randomIndex])
      setIsGenerating(false)
      setGeneratedCount((prev) => prev + 1)
      setTimeLeft(null)
      setIsTimerRunning(false)
    }, 800)
  }

  // Start timer for challenge
  const startTimer = () => {
    if (!currentChallenge) return

    // Extract minutes from timeEstimate (e.g., "45 minutes" -> 45)
    const minutes = Number.parseInt(currentChallenge.timeEstimate.split(" ")[0])
    setTimeLeft(minutes * 60) // Convert to seconds
    setIsTimerRunning(true)
  }

  // Handle timer countdown
  useEffect(() => {
    if (isTimerRunning && timeLeft !== null) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isTimerRunning, timeLeft])

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!solution.trim()) return

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setActiveTab("challenge")
    }, 1500)
  }

  // Copy challenge to clipboard
  const copyToClipboard = () => {
    if (!currentChallenge) return

    const challengeText = `
UX DESIGN CHALLENGE: ${currentChallenge.title}

${currentChallenge.description}

CONTEXT:
${currentChallenge.context}

CONSTRAINTS:
${currentChallenge.constraints.map((c) => `- ${c}`).join("\n")}

Difficulty: ${currentChallenge.difficulty}
Estimated Time: ${currentChallenge.timeEstimate}
Category: ${currentChallenge.category}
Tags: ${currentChallenge.tags.join(", ")}
  `.trim()

    navigator.clipboard.writeText(challengeText).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  // Share on social media
  const shareOnTwitter = () => {
    if (!currentChallenge) return

    const text = `I'm working on this UX design challenge: ${currentChallenge.title}. #UXDesign #DesignChallenge`
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    if (!currentChallenge) return

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(`UX Design Challenge: ${currentChallenge.title}`)
    const summary = encodeURIComponent(currentChallenge.description)
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
      "_blank",
    )
  }

  // Generate initial challenge on mount
  useEffect(() => {
    generateChallenge()
  }, [])

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-primary/20 text-primary border-primary/30"
      case "intermediate":
        return "bg-accent/20 text-accent-foreground border-accent/30"
      case "advanced":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-secondary/20 text-secondary border-secondary/30"
    }
  }

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mobile":
        return "bg-primary/20 text-primary border-primary/30"
      case "web":
        return "bg-secondary/20 text-secondary border-secondary/30"
      case "service":
        return "bg-accent/20 text-accent-foreground border-accent/30"
      case "product":
        return "bg-primary/20 text-primary border-primary/30"
      case "research":
        return "bg-secondary/20 text-secondary border-secondary/30"
      default:
        return "bg-muted/30 text-muted-foreground border-muted/50"
    }
  }

  // Magic wand animation
  const magicWandAnimation = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.2, 1],
      rotate: [0, 15, -15, 0],
      filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
    },
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }

  // Sparkle animation
  const sparkleAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: [0, 1, 0], scale: [0, 1, 0] },
    transition: { duration: 1.5, times: [0, 0.5, 1] }
  }

  return (
    <div className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Design Challenge Generator</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5 relative overflow-hidden group" 
            onClick={generateChallenge} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                  transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                  }
                }}
              >
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span>Generate Challenge</span>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div 
                    className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      y: [0, -10, -20],
                      x: [0, 5, 10]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                  <motion.div 
                    className="absolute top-1 -left-1 h-2 w-2 rounded-full bg-secondary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      y: [0, -8, -16],
                      x: [0, -5, -10]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.2,
                      repeat: Infinity,
                      repeatDelay: 0.8
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-accent"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      y: [0, 8, 16],
                      x: [0, 5, 10]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.4,
                      repeat: Infinity,
                      repeatDelay: 1.2
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      y: [0, 10, 20],
                      x: [0, -5, -10]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.6,
                      repeat: Infinity,
                      repeatDelay: 0.6
                    }}
                  />
                </div>
              </motion.div>
            )}
          </Button>
        </div>
        <CardDescription>Test your UX skills with randomly generated design challenges</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="challenge" className="flex-1">
              Challenge
            </TabsTrigger>
            <TabsTrigger value="solution" className="flex-1">
              Your Solution
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="challenge" className="pt-0">
          <CardContent className="p-6">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Shuffle className="h-8 w-8 text-muted-foreground animate-spin mb-4" />
                <p className="text-muted-foreground">Generating your challenge...</p>
              </div>
            ) : currentChallenge ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChallenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={getDifficultyColor(currentChallenge.difficulty)}>
                      {currentChallenge.difficulty.charAt(0).toUpperCase() + currentChallenge.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(currentChallenge.category)}>
                      {currentChallenge.category.charAt(0).toUpperCase() + currentChallenge.category.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                      <Clock className="mr-1 h-3 w-3" />
                      {currentChallenge.timeEstimate}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{currentChallenge.title}</h3>
                  <p className="text-muted-foreground mb-4">{currentChallenge.description}</p>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Context</h4>
                    <p className="text-sm text-muted-foreground">{currentChallenge.context}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Constraints</h4>
                    <ul className="space-y-1">
                      {currentChallenge.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {currentChallenge.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {timeLeft !== null ? (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium">Time Remaining</span>
                        <span className={`text-sm font-mono ${timeLeft < 60 ? "text-red-500 animate-pulse" : ""}`}>
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                      <Progress
                        value={(timeLeft / (Number.parseInt(currentChallenge.timeEstimate) * 60)) * 100}
                        className="h-2"
                        indicatorClassName={timeLeft < 60 ? "bg-red-500" : "bg-primary"}
                      />
                    </div>
                  ) : (
                    <Button onClick={startTimer} className="w-full mb-4" variant="outline">
                      <Clock className="mr-2 h-4 w-4" />
                      Start Timer ({currentChallenge.timeEstimate})
                    </Button>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setActiveTab("solution")}
                      className="flex-1 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      Submit Your Solution
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Share this challenge</DialogTitle>
                          <DialogDescription>
                            Share this design challenge with your friends or colleagues
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="flex flex-col gap-3">
                            <Button variant="outline" className="gap-2 justify-start" onClick={copyToClipboard}>
                              {isCopied ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  Copied to clipboard!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  Copy challenge text
                                </>
                              )}
                            </Button>

                            <Button variant="outline" className="gap-2 justify-start" onClick={shareOnTwitter}>
                              <Twitter className="h-4 w-4 text-primary" />
                              Share on Twitter
                            </Button>

                            <Button variant="outline" className="gap-2 justify-start" onClick={shareOnLinkedIn}>
                              <Linkedin className="h-4 w-4 text-primary" />
                              Share on LinkedIn
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No challenge generated yet</p>
                <Button
                  onClick={generateChallenge}
                  className="mt-4 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Generate Challenge
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="solution" className="pt-0">
          <CardContent className="p-6">
            {!currentChallenge ? (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">Please generate a challenge first</p>
                <Button
                  onClick={generateChallenge}
                  className="mt-4 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Generate Challenge
                </Button>
              </div>
            ) : isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="mb-4 p-3 rounded-full bg-green-100 dark:bg-green-900/30"
                >
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Solution Submitted!</h3>
                <p className="text-center text-muted-foreground mb-6">
                  Thank you for submitting your solution to the design challenge.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={generateChallenge}>
                    Try Another Challenge
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Challenge: {currentChallenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{currentChallenge.description}</p>
                  <Separator className="mb-4" />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="solution" className="mb-2 block">
                      Your Solution
                    </Label>
                    <Textarea
                      id="solution"
                      placeholder="Describe your solution approach, key features, and how it addresses the constraints..."
                      className="min-h-[150px]"
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">
                        Your Name
                      </Label>
                      <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">
                        Your Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("challenge")}>
                      Back to Challenge
                    </Button>
                    <Button
                      type="submit"
                      disabled={!solution.trim() || isSubmitting}
                      className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Solution
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Challenge #{generatedCount} • {currentChallenge?.category || "UX Design"}
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs text-muted-foreground">
            {isSubmitted ? "Completed" : "Earn XP by submitting solutions"}
          </span>
        </div>
      </CardFooter>
    </div>
  )
}

// Also add a named export for backward compatibility
export { DesignChallengeGenerator }
