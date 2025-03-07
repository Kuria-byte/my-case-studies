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
import { Calendar } from "@/components/ui/calendar";

export function EnhancedScheduling() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [meetingType, setMeetingType] = useState("consultation")
  const [totalSteps] = useState(5)

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
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#06D6A0] via-[#06D6A0]/80 to-[#118AB2] opacity-75 blur-sm group-hover:opacity-100 transition duration-1000"
          variants={shineAnimation}
          initial="initial"
          animate="animate"
        />
        <Card className="relative h-full bg-background/95 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#06D6A0]/10 via-transparent to-[#118AB2]/10 opacity-50" />
          
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
                    background: "linear-gradient(to right, #000000, #121212)",
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
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
                        Step {currentStep} of {totalSteps}
                      </span>
                      <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(currentStep / totalSteps) * 100}%`,
                          background: "linear-gradient(to right, #06D6A0, #118AB2)"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
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
                          value={meetingType}
                          onValueChange={(value) => setMeetingType(value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div>
                            <RadioGroupItem value="consultation" id="consultation" className="peer sr-only" />
                            <Label
                              htmlFor="consultation"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-transparent bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer h-full relative before:absolute before:inset-0 before:rounded-md before:border-2 before:border-transparent before:bg-gradient-to-r before:from-[#06D6A0] before:to-[#118AB2] before:content-[''] before:pointer-events-none before:-z-10"
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
                              className="flex flex-col items-center justify-between rounded-md border-2 border-transparent bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer h-full relative before:absolute before:inset-0 before:rounded-md before:border-2 before:border-transparent before:bg-gradient-to-r before:from-[#06D6A0] before:to-[#118AB2] before:content-[''] before:pointer-events-none before:-z-10"
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
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Select a date and time</h3>
                          <p className="text-sm text-muted-foreground">Choose a date and time that works for you</p>
                        </div>
                        
                        <div className="flex flex-col space-y-4">
                          <div className="border rounded-md p-4">
                            <h4 className="text-sm font-medium mb-2">Available dates</h4>
                            {/* Calendar integration */}
                            <div className="bg-white rounded-md">
                              <Calendar
                                mode="single"
                                className="rounded-md border"
                                selected={new Date()}
                                onSelect={() => {}}
                                disabled={(date) => 
                                  date < new Date() || 
                                  date.getDay() === 0 || 
                                  date.getDay() === 6
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <h4 className="text-sm font-medium mb-2">Available times</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                                <Button key={time} variant="outline" className="justify-start">
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Your information</h3>
                          <p className="text-sm text-muted-foreground">Please provide your contact details</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First name</Label>
                              <input
                                id="firstName"
                                className="w-full p-2 border rounded-md"
                                placeholder="John"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last name</Label>
                              <input
                                id="lastName"
                                className="w-full p-2 border rounded-md"
                                placeholder="Doe"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <input
                              id="email"
                              type="email"
                              className="w-full p-2 border rounded-md"
                              placeholder="john.doe@example.com"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Meeting details</h3>
                          <p className="text-sm text-muted-foreground">Tell us a bit about what you'd like to discuss</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="topic">Topic</Label>
                            <input
                              id="topic"
                              className="w-full p-2 border rounded-md"
                              placeholder="UX Review for my application"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="details">Details</Label>
                            <textarea
                              id="details"
                              className="w-full p-2 border rounded-md h-24"
                              placeholder="Please share any specific questions or areas you'd like to focus on during our meeting."
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Confirm your meeting</h3>
                          <p className="text-sm text-muted-foreground">Please review the details before confirming</p>
                        </div>
                        
                        <div className="space-y-4 border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <AnimatedCoffeeIcon className="h-8 w-8" />
                              <div>
                                <p className="font-medium">Free Consultation</p>
                                <p className="text-sm text-muted-foreground">30 minute session</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
                              Change
                            </Button>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Date & Time</p>
                                <p className="text-sm text-muted-foreground">Monday, March 10, 2025 at 10:00 AM</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => setCurrentStep(2)}>
                                Change
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Your Information</p>
                                <p className="text-sm text-muted-foreground">John Doe (john.doe@example.com)</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
                                Change
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Topic</p>
                                <p className="text-sm text-muted-foreground">UX Review for my application</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => setCurrentStep(4)}>
                                Change
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <DialogFooter className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button 
                      onClick={() => setCurrentStep(prev => Math.min(prev + 1, totalSteps))}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        // Here you would typically submit the form data
                        setIsOpen(false);
                        setCurrentStep(1);
                        // Show a success message or redirect
                      }}
                    >
                      Confirm Booking
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  )}
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
                    background: "linear-gradient(to right, #000000, #121212)",
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
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Request an Interview</DialogTitle>
                  <DialogDescription>
                    Complete the form below to request an interview.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="interviewTopic">Interview Topic</Label>
                    <input
                      id="interviewTopic"
                      className="w-full p-2 border rounded-md"
                      placeholder="UX Design Trends 2025"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interviewDetails">Details</Label>
                    <textarea
                      id="interviewDetails"
                      className="w-full p-2 border rounded-md h-24"
                      placeholder="Please share details about your interview request, including your publication or platform."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interviewEmail">Contact Email</Label>
                    <input
                      id="interviewEmail"
                      type="email"
                      className="w-full p-2 border rounded-md"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    onClick={() => {
                      // Here you would typically submit the form data
                      // Show a success message or redirect
                    }}
                  >
                    Submit Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
