"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Coffee, MessageSquare, ArrowRight, Clock, Users, Sparkles, ArrowLeft, Briefcase, Check, ChevronDown, User } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AnimatedCoffeeIcon, AnimatedMessageIcon } from "./schedule-icons"

export function EnhancedScheduling() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Floating animation for the icons
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-8, 0, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Shine animation for the gradient border
  const shineAnimation = {
    initial: { backgroundPosition: "200% 0" },
    animate: {
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Consultation Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="relative group"
        onHoverStart={() => setHoveredCard("consultation")}
        onHoverEnd={() => setHoveredCard(null)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000"
          variants={shineAnimation}
          initial="initial"
          animate="animate"
        />
        <Card className="relative h-full bg-background/95 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
          
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">Free Consultation</CardTitle>
                <CardDescription className="text-foreground/70">
                  Discuss your UX challenges and explore solutions
                </CardDescription>
              </div>
              <motion.div
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="relative h-12 w-12 flex items-center justify-center"
              >
                <AnimatedCoffeeIcon />
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4">
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Clock className="h-4 w-4 text-primary" />
              <span>30 minute session</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Users className="h-4 w-4 text-primary" />
              <span>1-on-1 with a UX expert</span>
            </div>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full mt-4 group relative overflow-hidden"
                  style={{
                    background: "linear-gradient(to right, #171717, #484745)",
                    color: "white"
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {hoveredCard === "consultation" ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Book Now
                      </>
                    ) : (
                      <>
                        Schedule Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#06D6A0] to-[#118AB2] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule a Meeting</DialogTitle>
                  <DialogDescription>
                    Complete the steps below to book your meeting.
                  </DialogDescription>
                </DialogHeader>

                <div className="mb-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>
                        Step 1 of 5
                      </span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">What type of meeting would you like to schedule?</h3>
                        <p className="text-sm text-muted-foreground">Choose the option that best fits your needs</p>
                      </div>

                      <RadioGroup
                        value="consultation"
                        onValueChange={() => {}}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="consultation" id="consultation" className="peer sr-only" />
                          <Label
                            htmlFor="consultation"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                          >
                            <AnimatedCoffeeIcon />
                            <div className="text-center">
                              <p className="font-medium mb-1">Free Consultation</p>
                              <p className="text-sm text-muted-foreground">
                                Discuss your UX challenges and how I can help improve your product experience
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="interview" id="interview" className="peer sr-only" />
                          <Label
                            htmlFor="interview"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                          >
                            <AnimatedMessageIcon />
                            <div className="text-center">
                              <p className="font-medium mb-1">Interview Request</p>
                              <p className="text-sm text-muted-foreground">
                                Schedule an interview to feature my work or discuss UX trends
                              </p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <DialogFooter className="flex justify-between items-center">
                  <Button variant="outline" disabled={true}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <Button onClick={() => {}} disabled={true}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interview Request Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="relative group"
        onHoverStart={() => setHoveredCard("interview")}
        onHoverEnd={() => setHoveredCard(null)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute -inset-0.5 rounded-xl bg-gradient-mixed opacity-0 blur-sm group-hover:opacity-100 transition duration-300"
          animate={{ 
            backgroundPosition: ["0% center", "100% center"],
            opacity: [0, 0.8, 0.6, 0.8, 0]
          }}
          transition={{ 
            backgroundPosition: {
              duration: 6, 
              ease: "linear", 
              repeat: Infinity,
              repeatType: "reverse" 
            },
            opacity: {
              duration: 3,
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
        <Card className="relative h-full bg-background/95 backdrop-blur-sm rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/20 transition-colors duration-300">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-secondary opacity-50" />
          
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">Interview Request</CardTitle>
                <CardDescription className="text-foreground/70">
                  Schedule an interview or feature request
                </CardDescription>
              </div>
              <motion.div
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="relative h-12 w-12 flex items-center justify-center"
              >
                <AnimatedMessageIcon />
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4">
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Clock className="h-4 w-4 text-primary" />
              <span>45 minute session</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-foreground/70">
              <Briefcase className="h-4 w-4 text-primary" />
              <span>Professional</span>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full mt-4 group relative overflow-hidden"
                  style={{
                    background: "linear-gradient(to right, #171717, #484745)",
                    color: "white"
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {hoveredCard === "interview" ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Request Now
                      </>
                    ) : (
                      <>
                        Request Interview
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#06D6A0] to-[#118AB2] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
