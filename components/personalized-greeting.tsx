"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Layers, Users, Clock, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function PersonalizedGreeting() {
  const { theme } = useTheme()
  const [greeting, setGreeting] = useState("")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning")
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    users: 0,
    hours: 0,
    success: 0
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setTimeOfDay("morning")
        setGreeting("Good morning")
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("afternoon")
        setGreeting("Good afternoon")
      } else if (hour >= 17 && hour < 21) {
        setTimeOfDay("evening")
        setGreeting("Good evening")
      } else {
        setTimeOfDay("night")
        setGreeting("Good night")
      }
    }
  }, [])

  // Animate stats on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const duration = 2000 // 2 seconds
      const steps = 60 // Update 60 times during animation
      const interval = duration / steps
      
      let currentStep = 0
      
      const timer = setInterval(() => {
        if (currentStep < steps) {
          const progress = currentStep / steps
          // Easing function for smooth animation
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
          const easedProgress = easeOutCubic(progress)

          setAnimatedStats({
            projects: Math.round(easedProgress * 12),
            users: Math.round(easedProgress * 840),
            hours: Math.round(easedProgress * 1200),
            success: Math.round(easedProgress * 94)
          })
          
          currentStep++
        } else {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isLoaded])

  const getTimeBasedColor = () => {
    // Using a consistent gradient from mint (#06D6A0) to ocean blue (#118AB2)
    return "from-[#06D6A0]/20 via-[#06D6A0]/10 to-[#118AB2]/20"
  }

  const stats = [
    {
      title: "Projects",
      value: animatedStats.projects,
      description: "Case Studies",
      icon: Layers,
      trend: "+2 this year",
      color: "text-primary"
    },
    {
      title: "User Tests",
      value: animatedStats.users,
      description: "Participants",
      icon: Users,
      trend: "92% satisfaction",
      color: "text-[#06D6A0]"
    },
    {
      title: "Hours Saved",
      value: `${(animatedStats.hours / 1000).toFixed(1)}k`,
      description: "For Clients",
      icon: Clock,
      trend: "78% efficiency",
      color: "text-[#118AB2]"
    },
    {
      title: "Success Rate",
      value: `${animatedStats.success}%`,
      description: "Project Goals",
      icon: CheckCircle2,
      trend: "Above target",
      color: "text-[#FFD166]"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className={`overflow-hidden border-border bg-gradient-to-r ${getTimeBasedColor()} transition-all duration-500`}>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Greeting Section */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight">{greeting}</h2>
                <p className="text-muted-foreground mt-1">Welcome to your UX portfolio dashboard</p>
              </motion.div>
              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Last updated</div>
                  <div className="font-medium">March 2025</div>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-lg bg-background/50 p-4 backdrop-blur-sm hover:bg-background/60 transition-all duration-300"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <motion.p
                          className="mt-1 text-2xl font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {stat.value}
                        </motion.p>
                      </div>
                      <motion.div
                        className={`rounded-full p-2.5 ${stat.color} bg-background/50`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="mt-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <p className="text-sm font-medium">{stat.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.trend}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
