"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Import all the icons we need
import {
  Figma,
  Paintbrush,
  PenTool,
  ImageIcon,
  Eye,
  Boxes,
  Code,
  FileCode,
  Waves,
  Globe,
  FileJson,
  ListTodo,
  ClipboardList,
  TrelloIcon,
  BookOpen,
  FileText,
  Calendar,
  GitBranch,
  Github,
  GitMerge,
  Container,
  Triangle,
  ExternalLink,
  Server,
  PackageOpen,
  Database,
  Flame,
  Zap,
  Plug,
} from "lucide-react"

// Update the skills data to shorter text that will fit better
const skillsData = [
  { subject: "UX Research", A: 90 },
  { subject: "UI Design", A: 85 },
  { subject: "Prototyping", A: 95 },
  { subject: "Testing", A: 80 },
  { subject: "IA", A: 75 },
  { subject: "Design Systems", A: 85 },
]

// Define skill categories with tools and professional icons
const skillCategories = [
  {
    name: "Design",
    description: "Tools and skills for creating beautiful, functional interfaces",
    icon: <Paintbrush className="h-6 w-6" />,
    color: "bg-blue-500/10 text-blue-500",
    tools: [
      { name: "Figma", icon: <Figma className="h-5 w-5" />, proficiency: "Expert", level: 95 },
      { name: "Sketch", icon: <PenTool className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Adobe XD", icon: <Paintbrush className="h-5 w-5" />, proficiency: "Advanced", level: 80 },
      { name: "Illustrator", icon: <PenTool className="h-5 w-5" />, proficiency: "Intermediate", level: 70 },
      { name: "Photoshop", icon: <ImageIcon className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "InVision", icon: <Eye className="h-5 w-5" />, proficiency: "Advanced", level: 80 },
    ],
  },
  {
    name: "Frontend",
    description: "Building responsive, accessible user interfaces",
    icon: <Code className="h-6 w-6" />,
    color: "bg-green-500/10 text-green-500",
    tools: [
      { name: "React", icon: <Boxes className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Next.js", icon: <Triangle className="h-5 w-5" />, proficiency: "Advanced", level: 80 },
      { name: "TypeScript", icon: <FileCode className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Tailwind CSS", icon: <Waves className="h-5 w-5" />, proficiency: "Expert", level: 90 },
      { name: "HTML/CSS", icon: <Globe className="h-5 w-5" />, proficiency: "Expert", level: 95 },
      { name: "JavaScript", icon: <FileJson className="h-5 w-5" />, proficiency: "Expert", level: 90 },
    ],
  },
  {
    name: "Project Management",
    description: "Organizing and leading design and development projects",
    icon: <ListTodo className="h-6 w-6" />,
    color: "bg-amber-500/10 text-amber-500",
    tools: [
      { name: "Jira", icon: <ListTodo className="h-5 w-5" />, proficiency: "Expert", level: 90 },
      { name: "Asana", icon: <ClipboardList className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Trello", icon: <TrelloIcon className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Notion", icon: <BookOpen className="h-5 w-5" />, proficiency: "Expert", level: 95 },
      { name: "Confluence", icon: <FileText className="h-5 w-5" />, proficiency: "Intermediate", level: 75 },
      { name: "Monday", icon: <Calendar className="h-5 w-5" />, proficiency: "Intermediate", level: 70 },
    ],
  },
  {
    name: "DevOps",
    description: "Version control and deployment workflows",
    icon: <GitBranch className="h-6 w-6" />,
    color: "bg-purple-500/10 text-purple-500",
    tools: [
      { name: "Git", icon: <GitBranch className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "GitHub", icon: <Github className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "GitLab", icon: <GitMerge className="h-5 w-5" />, proficiency: "Intermediate", level: 75 },
      { name: "Docker", icon: <Container className="h-5 w-5" />, proficiency: "Intermediate", level: 70 },
      { name: "Vercel", icon: <Triangle className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Netlify", icon: <ExternalLink className="h-5 w-5" />, proficiency: "Advanced", level: 80 },
    ],
  },
  {
    name: "Backend",
    description: "Server-side technologies and databases",
    icon: <Server className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-500",
    tools: [
      { name: "Node.js", icon: <Server className="h-5 w-5" />, proficiency: "Intermediate", level: 75 },
      { name: "Express", icon: <PackageOpen className="h-5 w-5" />, proficiency: "Intermediate", level: 70 },
      { name: "MongoDB", icon: <Database className="h-5 w-5" />, proficiency: "Intermediate", level: 70 },
      { name: "Firebase", icon: <Flame className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
      { name: "Supabase", icon: <Zap className="h-5 w-5" />, proficiency: "Intermediate", level: 75 },
      { name: "REST APIs", icon: <Plug className="h-5 w-5" />, proficiency: "Advanced", level: 85 },
    ],
  },
]

export function ExpandableSkills() {
  const { theme } = useTheme()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showAllSkills, setShowAllSkills] = useState(false)

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(category)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="categories">Skill Categories</TabsTrigger>
          <TabsTrigger value="radar">Skills Radar</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-0">
          <div className="space-y-4">
            {skillCategories.slice(0, showAllSkills ? skillCategories.length : 3).map((category) => (
              <Card key={category.name} className="overflow-hidden">
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer border-b border-border hover:bg-accent/50 transition-colors`}
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${category.color.split(" ")[0]}`}>{category.icon}</div>
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {expandedCategory === category.name ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {expandedCategory === category.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-6">
                          {category.tools.map((tool) => (
                            <div key={tool.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`
                                    flex items-center justify-center w-10 h-10 rounded-full shrink-0
                                    ${
                                      tool.proficiency === "Expert"
                                        ? "bg-green-500/10 text-green-500"
                                        : tool.proficiency === "Advanced"
                                          ? "bg-blue-500/10 text-blue-500"
                                          : "bg-amber-500/10 text-amber-500"
                                    }
                                  `}
                                  >
                                    {tool.icon}
                                  </div>
                                  <div>
                                    <div className="font-medium">{tool.name}</div>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        tool.proficiency === "Expert"
                                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                                          : tool.proficiency === "Advanced"
                                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                      }`}
                                    >
                                      {tool.proficiency}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">{tool.level}%</div>
                              </div>
                              <Progress value={tool.level} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}

            {!showAllSkills && skillCategories.length > 3 && (
              <Button variant="outline" className="w-full" onClick={() => setShowAllSkills(true)}>
                Show All Skill Categories
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="radar" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                    <PolarGrid stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: theme === "dark" ? "#ffffff80" : "#71717a",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                      cy={10}
                      tickSize={4}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{
                        fill: theme === "dark" ? "#ffffff50" : "#a1a1aa",
                        fontSize: 10,
                      }}
                      axisLine={false}
                    />
                    <Radar name="Skills" dataKey="A" stroke="#FFD166" fill="#FFD166" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

