"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Github, GitPullRequest, Linkedin, Mail, Star, Twitter, Users } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardFooter() {
  const [githubStats, setGithubStats] = useState({
    repos: null,
    stars: null,
    followers: null,
    contributions: null,
    isLoading: true,
  })

  useEffect(() => {
    // Simulate loading GitHub stats
    // In a real app, you would fetch this data from GitHub API
    const timer = setTimeout(() => {
      setGithubStats({
        repos: 28,
        stars: 142,
        followers: 76,
        contributions: 1243,
        isLoading: false,
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const statsItems = [
    {
      label: "GitHub Repos",
      value: githubStats.repos,
      icon: <Github className="h-5 w-5 text-primary" />,
      isLoading: githubStats.isLoading,
    },
    {
      label: "Stars Earned",
      value: githubStats.stars,
      icon: <Star className="h-5 w-5 text-amber-500" />,
      isLoading: githubStats.isLoading,
    },
    {
      label: "Followers",
      value: githubStats.followers,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      isLoading: githubStats.isLoading,
    },
    {
      label: "Contributions",
      value: githubStats.contributions,
      icon: <GitPullRequest className="h-5 w-5 text-green-500" />,
      isLoading: githubStats.isLoading,
    },
  ]

  return (
    <div className="mt-12 border-t py-10">
      <div className="relative mb-10">
        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <div className="flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 min-w-max md:min-w-0">
            {statsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-[260px] md:w-auto"
              >
                <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-background/80 p-2 rounded-full">{item.icon}</div>
                      <h3 className="font-medium">{item.label}</h3>
                    </div>
                    {item.isLoading ? (
                      <Skeleton className="h-10 w-20 rounded-md" />
                    ) : (
                      <motion.div
                        className="text-3xl font-bold"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {item.value}
                      </motion.div>
                    )}
                  </CardContent>
                  <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicators for mobile */}
        <div className="absolute left-0 top-0 bottom-4 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-4 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <p className="text-muted-foreground mb-4">
            Software Engineer with a passion for creating user-centered products that solve real problems. Specializing in
            fintech, startups, data visualization and AI-agents.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">UX Research</Badge>
            <Badge variant="outline">UI Design</Badge>
            <Badge variant="outline">Prototyping</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Latest Articles</h3>
          <ul className="space-y-3">
            {[
              "The Ethics of UX in Financial Services",
              "Designing for Low-connectivity Environments",
              "The Future of Mobile Banking in Africa",
            ].map((article, index) => (
              <li key={index} className="flex items-start gap-2">
                <Code className="h-4 w-4 mt-1 text-muted-foreground" />
                <Link href="#" className="text-sm hover:underline">
                  {article}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <p className="text-muted-foreground mb-4">
            Interested in working together? Reach out to discuss your project.
          </p>
          <Button className="w-full mb-4 relative overflow-hidden group bg-gradient-to-r from-[#06D6A0] to-[#118AB2] text-white hover:opacity-90">
            <span className="relative z-10 flex items-center gap-2">
              Contact Me <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
            K
          </div>
          <span className="font-bold">Kuria's UX Portfolio</span>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved. Built with <span className="text-rose-500">&hearts;</span>
        </div>
      </div>
    </div>
  )
}
