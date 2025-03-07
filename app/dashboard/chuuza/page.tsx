"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Lock, ShieldCheck, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChuuzaCaseStudy() {
  const router = useRouter()
  const { theme } = useTheme()
  const [accessCode, setAccessCode] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showDialog, setShowDialog] = useState(true)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)

  // In a real app, this would be validated securely on the server
  const correctAccessCode = "NDA2023"

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const handleVerifyCode = () => {
    if (accessCode === correctAccessCode) {
      setIsAuthenticated(true)
      setShowDialog(false)
      setError("")
      // In a real app, you would set a cookie or token here
    } else {
      setError("Invalid access code. Please try again.")
      setAttempts(attempts + 1)

      // After 3 attempts, redirect to dashboard
      if (attempts >= 2) {
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    }
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
              Chuuza
              <span className="ml-2 text-sm font-normal text-[#06D6A0]">Cleaning Management System</span>
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
                  src="/placeholder-user.jpg"
                  width="32"
                  height="32"
                  className="rounded-full border border-border"
                  alt="Kuria's avatar"
                />
              </Button>
            </div>
          </header>

          <AnimatePresence>
            {!isAuthenticated ? (
              <motion.div
                className="flex items-center justify-center min-h-[calc(100vh-4rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#06D6A0]/20 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-[#06D6A0]" />
                    </div>
                    <CardTitle className="text-center text-2xl">NDA Protected Content</CardTitle>
                    <CardDescription className="text-center">
                      This case study is protected by a Non-Disclosure Agreement. Please enter the access code provided
                      to you to view this content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <X className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          {error}
                          {attempts >= 2 && " Redirecting to dashboard..."}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="accessCode">Access Code</Label>
                        <Input
                          id="accessCode"
                          placeholder="Enter your access code"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          type="password"
                        />
                      </div>
                      <Button
                        className="w-full bg-[#06D6A0] hover:bg-[#06D6A0]/90 text-white"
                        onClick={handleVerifyCode}
                      >
                        Verify Access
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        If you don't have an access code, please contact Kuria for permission.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.main className="flex-1 overflow-auto p-6" variants={container} initial="hidden" animate="show">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hero Section */}
                  <motion.div variants={item} className="col-span-full">
                    <Card className="overflow-hidden border-border">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                          <div className="p-6 md:p-8">
                            <div className="inline-flex items-center rounded-full border border-border bg-background/80 text-[#06D6A0] px-3 py-1 text-sm mb-4">
                              <ShieldCheck className="mr-1 h-3 w-3" />
                              <span>NDA Protected</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Chuuza Dashboard</h1>
                            <p className="text-muted-foreground mb-6 max-w-md">
                              A comprehensive UX case study showcasing the design process behind a cleaning management
                              system that optimizes scheduling and resource allocation.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-6">
                              <div className="inline-flex items-center rounded-full bg-[#06D6A0]/10 text-[#06D6A0] px-3 py-1 text-sm">
                                SaaS
                              </div>
                              <div className="inline-flex items-center rounded-full bg-[#118AB2]/10 text-[#118AB2] px-3 py-1 text-sm">
                                Web App
                              </div>
                              <div className="inline-flex items-center rounded-full bg-[#FFD166]/10 text-[#FFD166] px-3 py-1 text-sm">
                                Management
                              </div>
                            </div>
                          </div>
                          <div className="relative h-[300px] md:h-[400px]">
                            <Image
                              src="/placeholder.svg?height=600&width=800"
                              alt="Chuuza App"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Project Overview */}
                  <motion.div variants={item} className="col-span-full">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Overview</CardTitle>
                        <CardDescription>Key information about the Chuuza project</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-lg font-medium mb-4">About the Project</h3>
                            <p className="text-muted-foreground mb-4">
                              Chuuza is a cleaning management system designed to optimize scheduling and resource
                              allocation for cleaning service providers. The platform helps managers assign tasks, track
                              performance, and improve overall operational efficiency.
                            </p>
                            <p className="text-muted-foreground">
                              This case study is protected by an NDA. The information presented here has been approved
                              for portfolio purposes while maintaining client confidentiality.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-2">Role</h4>
                              <p className="text-muted-foreground">Lead UX Designer</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Timeline</h4>
                              <p className="text-muted-foreground">3 months</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Team</h4>
                              <p className="text-muted-foreground">2 designers, 4 developers</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Platform</h4>
                              <p className="text-muted-foreground">Web, Mobile</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Project Metrics */}
                  <motion.div variants={item} className="col-span-full">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Metrics</CardTitle>
                        <CardDescription>Key performance indicators and outcomes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-card/50 rounded-lg p-6">
                            <div className="text-3xl font-bold text-[#06D6A0] mb-2">65%</div>
                            <h3 className="font-medium mb-1">Scheduling Efficiency</h3>
                            <p className="text-sm text-muted-foreground">
                              Increase in scheduling efficiency compared to previous manual processes
                            </p>
                          </div>
                          <div className="bg-card/50 rounded-lg p-6">
                            <div className="text-3xl font-bold text-[#118AB2] mb-2">42%</div>
                            <h3 className="font-medium mb-1">Resource Utilization</h3>
                            <p className="text-sm text-muted-foreground">
                              Improvement in resource utilization and allocation
                            </p>
                          </div>
                          <div className="bg-card/50 rounded-lg p-6">
                            <div className="text-3xl font-bold text-[#FFD166] mb-2">91%</div>
                            <h3 className="font-medium mb-1">Customer Satisfaction</h3>
                            <p className="text-sm text-muted-foreground">
                              Client satisfaction rate after implementation
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

