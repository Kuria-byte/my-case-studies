"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bookmark,
  BookOpen,
  Code,
  ExternalLink,
  FileText,
  Filter,
  Lightbulb,
  Search,
  PenToolIcon as Tool,
  Video,
} from "lucide-react"
import { UXResourceTabs } from "@/components/ux-resource-library-tabs"
import { Tabs, TabsContent } from "@/components/ui/tabs"

interface UXResource {
  id: string
  title: string
  description: string
  link: string
  category: "article" | "book" | "tool" | "template" | "video"
  tags: string[]
  isFeatured?: boolean
  isNew?: boolean
}

export function UXResourceLibrary() {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [savedResources, setSavedResources] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("article")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const resources: UXResource[] = [
    {
      id: "res-1",
      title: "The Design of Everyday Things",
      description:
        "Don Norman's seminal book on user-centered design principles and the psychology behind good and bad design.",
      link: "https://example.com/design-everyday-things",
      category: "book",
      tags: ["fundamentals", "psychology", "principles"],
      isFeatured: true,
    },
    {
      id: "res-2",
      title: "Nielsen Norman Group: 10 Usability Heuristics",
      description:
        "The definitive guide to Jakob Nielsen's 10 general principles for interaction design, fundamental to UX evaluation.",
      link: "https://example.com/usability-heuristics",
      category: "article",
      tags: ["heuristics", "evaluation", "principles"],
      isFeatured: true,
    },
    {
      id: "res-3",
      title: "Figma: Interactive Components Tutorial",
      description:
        "Learn how to create interactive components in Figma to build more realistic and testable prototypes.",
      link: "https://example.com/figma-interactive",
      category: "video",
      tags: ["tools", "prototyping", "interaction"],
      isNew: true,
    },
    {
      id: "res-4",
      title: "UX Research Plan Template",
      description:
        "A comprehensive template for planning user research studies, including participant recruitment and methodology.",
      link: "https://example.com/ux-research-template",
      category: "template",
      tags: ["research", "planning", "templates"],
    },
    {
      id: "res-5",
      title: "Maze: User Testing Platform",
      description:
        "A remote testing tool that allows you to collect quantitative and qualitative feedback on your designs.",
      link: "https://example.com/maze",
      category: "tool",
      tags: ["testing", "tools", "feedback"],
    },
    {
      id: "res-6",
      title: "Atomic Design Methodology",
      description:
        "Brad Frost's methodology for creating design systems with five distinct levels: atoms, molecules, organisms, templates, and pages.",
      link: "https://example.com/atomic-design",
      category: "article",
      tags: ["design systems", "methodology", "organization"],
    },
    {
      id: "res-7",
      title: "Accessibility for UX Designers",
      description: "A comprehensive guide to designing inclusive experiences for users with disabilities.",
      link: "https://example.com/accessibility-ux",
      category: "article",
      tags: ["accessibility", "inclusive design", "best practices"],
      isNew: true,
    },
    {
      id: "res-8",
      title: "Sketch UI Kit for Mobile Apps",
      description: "A comprehensive UI kit for designing mobile applications with pre-built components and patterns.",
      link: "https://example.com/sketch-ui-kit",
      category: "template",
      tags: ["mobile", "ui kit", "templates"],
    },
    {
      id: "res-9",
      title: "Don't Make Me Think",
      description: "Steve Krug's practical guide to web usability with common-sense approaches to UX design.",
      link: "https://example.com/dont-make-me-think",
      category: "book",
      tags: ["usability", "web design", "principles"],
    },
    {
      id: "res-10",
      title: "Optimal Workshop: Card Sorting Tool",
      description:
        "A platform for conducting card sorting exercises to improve information architecture and navigation.",
      link: "https://example.com/optimal-workshop",
      category: "tool",
      tags: ["information architecture", "card sorting", "tools"],
    },
    {
      id: "res-11",
      title: "Mobile UX Design Best Practices",
      description: "A comprehensive guide to designing effective and user-friendly mobile experiences.",
      link: "https://example.com/mobile-ux-best-practices",
      category: "article",
      tags: ["mobile", "best practices", "design patterns"],
    },
    {
      id: "res-12",
      title: "UX Research Methods Cheat Sheet",
      description:
        "A quick reference guide to different UX research methods and when to use them in your design process.",
      link: "https://example.com/ux-research-cheatsheet",
      category: "template",
      tags: ["research", "methods", "cheat sheet"],
    },
  ]

  // Get all unique tags
  const allTags = Array.from(new Set(resources.flatMap((resource) => resource.tags)))

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const toggleSaveResource = (id: string) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter((resId) => resId !== id))
    } else {
      setSavedResources([...savedResources, id])
    }
  }

  const filteredResources = resources.filter((resource) => {
    // Filter by search query
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => resource.tags.includes(tag))

    // Filter by category
    const matchesCategory = resource.category === activeCategory

    return matchesSearch && matchesTags && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "article":
        return <FileText className="h-5 w-5" />
      case "book":
        return <BookOpen className="h-5 w-5" />
      case "tool":
        return <Tool className="h-5 w-5" />
      case "template":
        return <Code className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "article":
        return "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20"
      case "book":
        return "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20"
      case "tool":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20"
      case "template":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20"
      case "video":
        return "bg-red-500/10 text-red-500 dark:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 dark:bg-gray-500/20"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>My Library</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <CardDescription>Curated resources to enhance your UX knowledge and skills</CardDescription>

        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Filter by tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedTags.includes(tag)
                              ? "bg-white/10 text-gray-500 shadow-sm border border-gray-200/30"
                              : "text-gray-500 border-gray-200/30 hover:bg-white/5"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <UXResourceTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-full" />
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 bg-muted rounded animate-pulse w-16" />
                      <div className="h-6 bg-muted rounded animate-pulse w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredResources.length > 0 ? (
              <ScrollArea className="h-[500px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-lg border border-border p-4 ${
                        resource.isFeatured ? "ring-1 ring-primary/20" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${getCategoryColor(resource.category)}`}>
                            {getCategoryIcon(resource.category)}
                          </div>
                          <h3 className="font-medium">{resource.title}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${
                            savedResources.includes(resource.id) ? "text-primary" : "text-muted-foreground"
                          }`}
                          onClick={() => toggleSaveResource(resource.id)}
                        >
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only">Save resource</span>
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-xs bg-white/10 text-gray-500 shadow-sm border border-gray-200/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {resource.isFeatured && (
                            <Badge 
                              variant="default" 
                              className="bg-primary/10 text-primary border border-primary/20 shadow-sm hover:bg-primary/15"
                            >
                              Featured
                            </Badge>
                          )}
                          {resource.isNew && (
                            <Badge 
                              variant="default" 
                              className="bg-green-500/10 text-green-500 border border-green-500/20 shadow-sm hover:bg-green-500/15"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="gap-1.5" asChild>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            View Resource
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/50 p-4 rounded-full mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No resources found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedTags([])
                    setActiveCategory("all")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
