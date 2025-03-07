"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MarketForceCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            UX Portfolio
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/projects" className="text-sm font-medium hover:text-primary">
              Projects
            </Link>
            <Link href="/journal" className="text-sm font-medium hover:text-primary">
              Journal
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden bg-blue-50">
          <motion.div className="container relative z-10" style={{ opacity, y, scale }}>
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Market Force</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">Digital wallet & Reconciliation platform</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">UX Research</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">UI Design</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fintech</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mobile App</span>
              </div>
            </div>
          </motion.div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Market Force App"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Market Force is a digital wallet and reconciliation platform designed for financial institutions in
                  emerging markets. The platform helps users manage transactions, reconcile accounts, and provide
                  financial services to underserved populations.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-2">Role</h3>
                    <p className="text-muted-foreground">Lead UX Designer</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Timeline</h3>
                    <p className="text-muted-foreground">4 months</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Team</h3>
                    <p className="text-muted-foreground">3 designers, 5 developers</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Platform</h3>
                    <p className="text-muted-foreground">iOS, Android, Web</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Key Challenges</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Complex Financial Workflows</p>
                      <p className="text-sm text-muted-foreground">
                        Simplifying multi-step reconciliation processes for non-technical users
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Low Connectivity Environments</p>
                      <p className="text-sm text-muted-foreground">
                        Designing for areas with limited internet access and low-end devices
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Financial Literacy Barriers</p>
                      <p className="text-sm text-muted-foreground">
                        Creating intuitive interfaces for users with varying levels of financial knowledge
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Research & Discovery</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">User Interviews</h3>
                  <p className="text-muted-foreground">
                    Conducted 24 interviews with financial agents, merchants, and end-users across 3 countries
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Competitive Analysis</h3>
                  <p className="text-muted-foreground">
                    Analyzed 8 competing platforms to identify market gaps and opportunities for innovation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                      <path d="M10 9H8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Field Studies</h3>
                  <p className="text-muted-foreground">
                    Observed users in their natural environments to understand contextual challenges
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Key Research Insights</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Users struggled with transaction reconciliation</p>
                      <p className="text-sm text-muted-foreground">
                        87% of agents reported spending 3+ hours daily on manual reconciliation tasks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Offline functionality was critical</p>
                      <p className="text-sm text-muted-foreground">
                        62% of users experienced connectivity issues at least once per day
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Visual confirmation was essential</p>
                      <p className="text-sm text-muted-foreground">
                        Users strongly preferred visual transaction receipts over text-based confirmations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Trust indicators were crucial</p>
                      <p className="text-sm text-muted-foreground">
                        Users needed clear security indicators and transaction transparency
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Prototype Section */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6 text-center">Interactive Prototype</h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              Explore the final design solution through this interactive prototype. Click through the screens to
              experience the user flow.
            </p>

            <div className="bg-slate-100 p-8 rounded-lg flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[9/16] bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
                <Image
                  src="/placeholder.svg?height=800&width=400"
                  alt="Interactive prototype"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="gap-2">
                    Try Interactive Prototype <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous Screen
                </Button>
                <Button variant="outline" size="sm">
                  Next Screen <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-blue-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Results & Impact</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 20V10" />
                      <path d="m18 20-6-6-6 6" />
                      <path d="M18 4H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Efficiency Increase</h3>
                  <p className="text-muted-foreground">
                    Reduced reconciliation time by 78%, saving agents an average of 2.5 hours daily
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Error Reduction</h3>
                  <p className="text-muted-foreground">
                    Decreased transaction errors by 92% through automated verification and visual confirmations
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">User Adoption</h3>
                  <p className="text-muted-foreground">
                    Achieved 94% user satisfaction rating and 89% adoption rate within 3 months of launch
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Client Testimonial</h3>
              <blockquote className="text-lg italic text-muted-foreground mb-6">
                "The Market Force platform has transformed how our agents manage transactions. The intuitive design and
                offline capabilities have made a significant impact on our operational efficiency and customer
                satisfaction."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Director of Operations, Financial Services Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Case Study */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore More Case Studies</h2>
              <p className="text-lg text-muted-foreground">Discover my other projects and design solutions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/case-studies/m-pawa" className="group block">
                <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg h-full">
                  <div className="bg-indigo-100 p-6 aspect-video relative">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="M-pawa"
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">M-pawa</h3>
                    <p className="text-muted-foreground mb-4">Mobile banking platform</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/case-studies/chuuza" className="group block">
                <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg h-full">
                  <div className="bg-teal-100 p-6 aspect-video relative">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Chuuza"
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">Chuuza</h3>
                    <p className="text-muted-foreground mb-4">Cleaning Management System</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Case Study <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-slate-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">UX Portfolio</span>
            </div>
            <nav className="flex gap-8">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

