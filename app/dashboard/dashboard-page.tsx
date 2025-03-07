"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, Clock, Layers, MessageSquare, Star, Users, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarNav } from "@/components/sidebar-nav"
import { CaseStudyCard } from "@/components/case-study-card"
import { OverallMetrics } from "@/components/overall-metrics"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Import new components
import { CollapsibleUXAssistant } from "@/components/collapsible-ux-assistant"
import { DashboardFooter } from "@/components/dashboard-footer"
import { ExpandableSkills } from "@/components/expandable-skills"
import { EnhancedScheduling } from "@/components/enhanced-scheduling"
import { PersonalizedGreeting } from "@/components/personalized-greeting"
import { UXResourceLibrary } from "@/components/ux-resource-library"
import { CollapsibleDesignChallenge } from "@/components/collapsible-design-challenge"
import { BentoQuizCard } from "@/components/bento-quiz-card"
import DesignChallengeGenerator from "@/components/design-challenge-generator"

export default function DashboardPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", content: "Hi there! I'm Kuria's UX Assistant. How can I help you today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const chatEndRef = useRef(null)
  const sectionsRef = useRef<HTMLDivElement>(null)

  const handleCaseStudyClick = (slug: string) => {
    router.push(`/dashboard/${slug}`)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    setChatMessages((prev) => [...prev, { role: "user", content: inputMessage }])

    // Simulate bot response based on user input
    const simulateBotResponse = (message: string) => {
      let botResponse = ""

      if (message.toLowerCase().includes("market force")) {
        botResponse =
          "Market Force is a digital wallet & reconciliation platform for financial institutions in emerging markets. The project achieved a 78% increase in efficiency and 92% reduction in errors."
      } else if (message.toLowerCase().includes("process") || message.toLowerCase().includes("methodology")) {
        botResponse =
          "My UX process typically involves discovery (user research, stakeholder interviews), definition (personas, journey maps), design (wireframes, prototypes), and validation (usability testing, iteration)."
      } else if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("hire")) {
        botResponse = "You can contact Kuria at hello@kuria.design to discuss potential projects or collaborations."
      } else if (message.toLowerCase().includes("tools") || message.toLowerCase().includes("software")) {
        botResponse =
          "I primarily use Figma for design, Maze for usability testing, and various prototyping tools depending on the project needs."
      } else {
        botResponse =
          "Thanks for your message! Feel free to ask about my UX process, specific case studies, or design methodology."
      }

      setChatMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }

    setTimeout(() => {
      simulateBotResponse(inputMessage)
    }, 1000)

    setInputMessage("")
  }

  useEffect(() => {
    // Scroll to bottom of chat when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Easter egg: Profile picture animation on hover
  const [isProfileHovered, setIsProfileHovered] = useState(false)

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

            <div className="hidden md:block text-lg font-semibold">Projects Dashboard</div>

            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                onHoverStart={() => setIsProfileHovered(true)}
                onHoverEnd={() => setIsProfileHovered(false)}
                className="relative"
              >
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                  <span className="sr-only">User menu</span>
                  <Image
                    src="/placeholder-user.jpg"
                    width="32"
                    height="32"
                    className="rounded-full border border-border"
                    alt="Kuria's avatar"
                  />
                </Button>
                {isProfileHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 p-2 bg-card rounded-md shadow-lg border border-border text-sm"
                  >
                    Hi there! Thanks for visiting my portfolio!
                  </motion.div>
                )}
              </motion.div>
            </div>
          </header>

          {/* Dashboard Content */}
          <motion.main className="flex-1 overflow-x-hidden p-6" variants={container} initial="hidden" animate="show">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={sectionsRef}>
              {/* Personalized Greeting */}
              <motion.div 
                variants={item} 
                className="col-span-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <PersonalizedGreeting />
              </motion.div>

              {/* Hero Section */}
              <motion.div variants={item} className="col-span-full">
                <Card className="overflow-hidden border-border">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="p-6 md:p-8">
                        <div className="inline-flex items-center rounded-full border border-border bg-background/80 text-primary px-3 py-1 text-sm mb-4">
                          <Star className="mr-1 h-3 w-3" />
                          <span>Kuria</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                          Interactive UX Case Studies
                        </h1>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          Explore my design process through immersive case studies that showcase my approach to solving
                          complex user problems.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-6">
                          <div className="inline-flex items-center rounded-full bg-accent/10 text-accent-foreground px-3 py-1 text-sm">
                            UX Research
                          </div>
                          <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm">
                            UI Design
                          </div>
                          <div className="inline-flex items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-sm">
                            User Testing
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-[#06D6A0] to-[#118AB2] hover:opacity-90 text-white shadow-md"
                        >
                          Explore Case Studies
                        </Button>
                      </div>
                      <HeroImageCarousel />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

           
          

              {/* Overall Metrics */}
              <motion.div variants={item} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Metrics</CardTitle>
                    <CardDescription>Key performance indicators across all projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OverallMetrics />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills Radar - Replace with ExpandableSkills */}
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Core competencies and expertise</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExpandableSkills />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Case Studies Section */}
              <motion.div variants={item} className="col-span-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Studies</CardTitle>
                    <CardDescription>Explore detailed UX case studies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <CaseStudyCard
                        title="Market Force"
                        description="Digital wallet & Reconciliation platform for financial institutions in emerging markets"
                        image="/placeholder.svg?height=400&width=300"
                        color="bg-primary"
                        tags={["Fintech", "Mobile App", "Dashboard"]}
                        metrics={[
                          { label: "Efficiency Increase", value: "78%" },
                          { label: "Error Reduction", value: "92%" },
                          { label: "User Satisfaction", value: "94%" },
                        ]}
                        locked={false}
                        onClick={() => handleCaseStudyClick("market-force")}
                      />
                      <CaseStudyCard
                        title="M-pawa"
                        description="Mobile banking platform designed for underserved communities with limited financial access"
                        image="/placeholder.svg?height=400&width=300"
                        color="bg-secondary"
                        tags={["Banking", "Inclusion", "Mobile Money"]}
                        metrics={[
                          { label: "New Users", value: "+45%" },
                          { label: "Transaction Volume", value: "+120%" },
                          { label: "User Retention", value: "88%" },
                        ]}
                        locked={false}
                        onClick={() => handleCaseStudyClick("m-pawa")}
                      />
                      <CaseStudyCard
                        title="Afya Health"
                        description="Healthcare platform connecting patients with doctors and facilitating remote consultations"
                        image="/placeholder.svg?height=400&width=300"
                        color="bg-accent"
                        tags={["Healthcare", "Telemedicine", "Booking"]}
                        metrics={[
                          { label: "Appointment Bookings", value: "+65%" },
                          { label: "Patient Satisfaction", value: "91%" },
                          { label: "Doctor Onboarding", value: "+40%" },
                        ]}
                        locked={true}
                        onClick={() => handleCaseStudyClick("afya-health")}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Add Enhanced Scheduling Section before Quiz section */}
              <motion.div variants={item} className="col-span-full">
                <EnhancedScheduling />
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={item} className="col-span-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Updates</CardTitle>
                    <CardDescription>Latest additions and improvements to case studies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                      <div className="space-y-8">
                        {[
                          {
                            date: "2 days ago",
                            title: "Market Force Case Study Updated",
                            description: "Added new usability testing results and updated metrics",
                          },
                          {
                            date: "1 week ago",
                            title: "New Quiz Added",
                            description: "Added interactive quiz on usability heuristics",
                          },
                          {
                            date: "2 weeks ago",
                            title: "M-pawa Case Study Published",
                            description: "Released complete case study with interactive prototype",
                          },
                        ].map((item, index) => (
                          <div key={index} className="relative pl-10">
                            <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-[#FFD166]/20 text-[#FFD166] flex items-center justify-center">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <div className="text-sm text-muted-foreground">{item.date}</div>
                              <div className="hidden sm:block text-muted-foreground mx-2">•</div>
                              <div className="font-medium">{item.title}</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                          </div>
                        ))}
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="relative pl-10 cursor-pointer hover:bg-background/60 p-2 rounded-md transition-colors group">
                              <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-[#06D6A0]/20 text-[#06D6A0] flex items-center justify-center group-hover:bg-[#06D6A0]/30">
                                <Activity className="h-4 w-4 animate-pulse" />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <div className="text-sm text-muted-foreground">Currently working on</div>
                                <div className="hidden sm:block text-muted-foreground mx-2">•</div>
                                <div className="font-medium">New case study</div>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                Stay tuned for updates!
                                <span className="ml-1 text-xs text-primary">(Click for details)</span>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Currently Working On
                              </DialogTitle>
                              <DialogDescription>
                                Project details and progress updates
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div>
                                <h3 className="text-lg font-medium mb-2">Mental Health App Case Study</h3>
                                <p className="text-sm text-muted-foreground">
                                  I'm currently working on a comprehensive case study for a mental health app 
                                  designed to help users track their mood, practice mindfulness, and connect with therapists.
                                </p>
                              </div>
                              
                              <div className="bg-background/50 p-3 rounded-md border">
                                <h4 className="text-sm font-medium mb-2">Project Timeline</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                    <span>Research phase completed</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                    <span>User interviews conducted</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
                                    <span className="font-medium">Currently working on wireframes</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                                    <span>High-fidelity mockups (Coming soon)</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                                    <span>Usability testing (Coming soon)</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="text-sm text-muted-foreground italic">
                                Expected completion: April 2025
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* UX Academy */}
              <motion.div variants={item} className="col-span-full">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">UX Academy</h2>
                    <Button variant="outline" className="text-sm">
                      View All Courses
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-12">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* UX Research Methods - Spans 6 columns on md */}
                        <div className="md:col-span-6 md:row-span-1">
                          <BentoQuizCard
                            title="UX Research Methods"
                            description="Test your knowledge of different UX research methodologies and when to use them."
                            questionCount={5}
                            estimatedTime="3 min"
                            difficulty="Beginner"
                            color="bg-primary/10"
                            textColor="text-primary"
                          />
                        </div>

                        {/* Usability Heuristics - Spans 6 columns on md */}
                        <div className="md:col-span-6 md:row-span-1">
                          <BentoQuizCard
                            title="Usability Heuristics"
                            description="Challenge yourself with questions about Nielsen's usability heuristics and their application."
                            questionCount={10}
                            estimatedTime="5 min"
                            difficulty="Intermediate"
                            color="bg-[#118AB2]/10"
                            textColor="text-[#118AB2]"
                          />
                        </div>

                        {/* Design Challenge Generator - Spans full width */}
                        <div className="md:col-span-12">
                          <CollapsibleDesignChallenge />
                   
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* UX Resource Library */}
              <motion.div variants={item} className="col-span-full">
                <UXResourceLibrary />
              </motion.div>

              {/* Replace existing Interactive Chatbot with CollapsibleUXAssistant */}
              <motion.div variants={item} className="col-span-full">
                <CollapsibleUXAssistant />
              </motion.div>

              {/* Add the footer */}
              <motion.div variants={item} className="col-span-full">
                <DashboardFooter />
              </motion.div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  )
}

function HeroImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const images = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "UX Portfolio - Design Process",
      accent: "from-[#06D6A0]/20 to-transparent"
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=User+Research",
      alt: "UX Portfolio - User Research",
      accent: "from-[#118AB2]/20 to-transparent"
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=Design+System",
      alt: "UX Portfolio - Design System",
      accent: "from-[#FFD166]/20 to-transparent"
    }
  ];
  
  // Auto-scroll effect
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);
  
  // Handle manual navigation
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div 
      className="relative h-[300px] md:h-[400px] overflow-hidden rounded-r-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with transitions */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.05
            }}
            transition={{ 
              opacity: { duration: 0.7 },
              scale: { duration: 0.7 }
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${image.accent}`}></div>
          </motion.div>
        ))}
      </div>
      
      {/* Overlay content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/80 to-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/90 backdrop-blur-sm bg-black/20 inline-block px-3 py-1 rounded-full"
        >
          {currentImageIndex === 0 ? "Design Process" : 
           currentImageIndex === 1 ? "User Research" : "Design System"}
        </motion.div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Left/Right navigation arrows (visible on hover) */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
              onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
            >
              ←
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
              onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
            >
              →
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
