"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectMetrics } from "@/components/project-metrics"
import { CollapsibleTimeline } from "@/components/collapsible-timeline"
import { UserFeedback } from "@/components/user-feedback"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { FeedbackForm } from "@/components/feedback-form"
import { ABTesting } from "@/components/ab-testing"
import { KeyChallenges } from "@/components/key-challenges"
import { InteractivePrototype } from "@/components/interactive-prototype"
import { IdeationGallery } from "@/components/ideation-gallery"
import { DesignEvolution } from "@/components/design-evolution"
import { LessonsReflections } from "@/components/lessons-reflections"
import { ProjectConclusion } from "@/components/project-conclusion"
import { Badge } from "@/components/ui/badge"

export default function MarketForceCaseStudy() {
  const router = useRouter()
  const { theme } = useTheme()

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <SidebarNav />
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-sm">
            <SidebarTrigger />

            <div className="hidden md:block text-lg font-semibold">
              Market Force
              <span className="ml-2 text-sm font-normal text-[#FFD166]">Digital Wallet & Reconciliation</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleBackToDashboard}>
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="sr-only">User menu</span>
                <Image
                  src="/images/ian.jpg"
                  width="32"
                  height="32"
                  className="rounded-full border border-border"
                  alt="Ian Kuria's avatar"
                />
              </Button>
            </div>
          </header>

          {/* Dashboard Content - Reorganized for narrative flow */}
          <motion.main className="flex-1 overflow-auto p-6" variants={container} initial="hidden" animate="show">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. INTRODUCTION - Hero Section */}
              <motion.div variants={item} className="col-span-full">
                <Card className="overflow-hidden border-border">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="p-6 md:p-8">
                        <div className="inline-flex items-center rounded-full border border-border bg-background/80 text-[#FFD166] px-3 py-1 text-sm mb-4">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Case Study</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Market Force Dashboard</h1>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          A comprehensive UX case study showcasing the design process behind Reja Reja digital wallet and
                          reconciliation platform for financial institutions in emerging markets.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-6">
                          <div className="inline-flex items-center rounded-full bg-[#FFD166]/10 text-[#FFD166] px-3 py-1 text-sm">
                            UX Research
                          </div>
                          <div className="inline-flex items-center rounded-full bg-[#06D6A0]/10 text-[#06D6A0] px-3 py-1 text-sm">
                            UI Design
                          </div>
                          <div className="inline-flex items-center rounded-full bg-[#118AB2]/10 text-[#118AB2] px-3 py-1 text-sm">
                            Fintech
                          </div>
                        </div>
                      </div>
                      <div className="relative h-[300px] md:h-[400px]">
                        <Image
                          src="/images/reja.png"
                          alt="Market Force App"
                          fill
                          className="object-contain"
                        />
                        {/* Removed the gradient/blur effect */}
                        {/* <Button className="absolute bottom-4 right-4 bg-[#FFD166] text-black hover:bg-[#FFD166]/90">
                          View Prototype <ArrowRight className="ml-2 h-4 w-4" />
                        </Button> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 2. PROJECT OVERVIEW - Project Status & Team */}
              <motion.div variants={item} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                    <CardDescription>Timeline, team, and current status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Research</span>
                          <span className="text-sm text-muted-foreground">100%</span>
                        </div>
                        <Progress value={100} className="h-2" indicatorClassName="bg-[#06D6A0]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Design</span>
                          <span className="text-sm text-muted-foreground">100%</span>
                        </div>
                        <Progress value={100} className="h-2" indicatorClassName="bg-[#06D6A0]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Testing</span>
                          <span className="text-sm text-muted-foreground">100%</span>
                        </div>
                        <Progress value={100} className="h-2" indicatorClassName="bg-[#06D6A0]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Implementation</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <Progress value={85} className="h-2" indicatorClassName="bg-[#FFD166]" />
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        {/* <h4 className="font-medium">Team</h4> */}
                        {/* <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                          View All
                        </Button> */}
                      </div>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2">My Roles</h5>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">UX Research Lead</Badge>
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">UI Design</Badge>
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">Usability Testing</Badge>
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">Product Strategy</Badge>
                        </div>
                      </div>
                      {/* <h5 className="text-sm font-medium mb-2">Team Members</h5> */}
                      {/* <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full bg-muted border border-background flex items-center justify-center text-xs font-medium"
                          >
                            {i}
                          </div>
                        ))}
                        <div className="h-8 w-8 rounded-full bg-[#FFD166] border border-background flex items-center justify-center text-xs font-medium text-black">
                          +2
                        </div>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Project Timeline */}
              <motion.div variants={item} className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>Project milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CollapsibleTimeline />
                  </CardContent>
                </Card>
              </motion.div>

              {/* 3. PROBLEM STATEMENT - Key Challenges */}
              <motion.div variants={item} className="col-span-full">
                <KeyChallenges />
              </motion.div>

              {/* 4. RESEARCH - User Research Tabs */}
              <motion.div variants={item} className="col-span-full">
                <Card>
                  <CardHeader>
                    <CardTitle>User Research</CardTitle>
                    <CardDescription>Key findings and insights from research</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="interviews" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="interviews">Interviews</TabsTrigger>
                        <TabsTrigger value="surveys">Surveys</TabsTrigger>
                        <TabsTrigger value="testing">Usability</TabsTrigger>
                      </TabsList>
                      <TabsContent value="interviews" className="mt-0">
                        <div className="space-y-4">
                          <div className="bg-card/50 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-full bg-[#FFD166]/20 flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="h-5 w-5 text-[#FFD166]" />
                              </div>
                              <div>
                                <h4 className="font-medium">Transaction Reconciliation</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  "I spend over 3 hours daily manually reconciling transactions. It's the most
                                  time-consuming part of my job."
                                </p>
                                <div className="mt-2 text-xs text-muted-foreground">Financial Agent, Kenya</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-full bg-[#06D6A0]/20 flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="h-5 w-5 text-[#06D6A0]" />
                              </div>
                              <div>
                                <h4 className="font-medium">Offline Functionality</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  "Internet connectivity is unreliable in my area. I need a system that works offline
                                  and syncs when connection is available."
                                </p>
                                <div className="mt-2 text-xs text-muted-foreground">Merchant, Tanzania</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="surveys" className="mt-0">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-card/50 rounded-lg p-4">
                              <div className="text-3xl font-bold text-[#FFD166] mb-2">87%</div>
                              <p className="text-sm text-muted-foreground">
                                of agents reported spending 3+ hours daily on manual reconciliation
                              </p>
                            </div>
                            <div className="bg-card/50 rounded-lg p-4">
                              <div className="text-3xl font-bold text-[#06D6A0] mb-2">62%</div>
                              <p className="text-sm text-muted-foreground">
                                of users experienced connectivity issues at least once per day
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="testing" className="mt-0">
                        <div className="space-y-4">
                          <div className="bg-card/50 rounded-lg p-4">
                            <h4 className="font-medium mb-2">Task Completion Rate</h4>
                            <div className="flex items-center gap-4">
                              <div className="w-full">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs">Initial Design</span>
                                  <span className="text-xs">68%</span>
                                </div>
                                <Progress value={68} className="h-2" indicatorClassName="bg-[#EF476F]" />
                              </div>
                              <div className="w-full">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs">Final Design</span>
                                  <span className="text-xs">94%</span>
                                </div>
                                <Progress value={94} className="h-2" indicatorClassName="bg-[#06D6A0]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 5. IDEATION - Ideation Gallery */}
              <motion.div variants={item} className="col-span-full">
                <IdeationGallery />
              </motion.div>

              {/* 6. DESIGN PROCESS - Design Evolution */}
              <motion.div variants={item} className="col-span-full">
                <DesignEvolution />
              </motion.div>

              {/* 7. TESTING - A/B Testing */}
              <motion.div variants={item} className="col-span-full">
                <ABTesting />
              </motion.div>

              {/* 8. PROTOTYPE - Interactive Prototype */}
              <motion.div variants={item} className="col-span-full">
                <InteractivePrototype />
              </motion.div>

              {/* 9. USER FEEDBACK */}
              <motion.div variants={item} className="col-span-full">
                <Card>
                  <CardHeader>
                    <CardTitle>User Feedback</CardTitle>
                    <CardDescription>Reactions from user testing sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserFeedback />
                  </CardContent>
                </Card>
              </motion.div>

              {/* 10. RESULTS - Project Metrics */}
              <motion.div variants={item} className="col-span-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Results</CardTitle>
                    <CardDescription>Key performance indicators and project outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProjectMetrics />
                  </CardContent>
                </Card>
              </motion.div>

              {/* 11. LESSONS - Lessons & Reflections */}
              <motion.div variants={item} className="col-span-full">
                <LessonsReflections />
              </motion.div>

              {/* 12. CONCLUSION - Project Conclusion */}
              <motion.div variants={item} className="col-span-full">
                <ProjectConclusion />
              </motion.div>

              {/* 13. FEEDBACK FORM - At the very end */}
              <motion.div variants={item} className="col-span-full">
                <FeedbackForm />
              </motion.div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  )
}
